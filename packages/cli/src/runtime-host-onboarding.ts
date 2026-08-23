/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { deriveConnectionSlug } from '@maka/core/llm-connections';
import { isRetiredProvider } from '@maka/core/provider-registry';
import type { ConnectionCatalogSnapshot } from '@maka/core/runtime-policy';
import {
  readRuntimeHostConnectionCatalog,
  type RuntimeHostConnection,
} from '@maka/runtime-host/client';
import { listApiKeyOnboardableProviders } from './onboarding-catalog.js';
import type {
  MakaOnboardingSurface,
  ModelChoice,
  OnboardingFailure,
  OnboardingProviderEntry,
  OnboardingRejectionReason,
} from './pi-tui-contracts.js';

/** Adapt the TUI onboarding workflow to Host-owned verification and persistence. */
export function createRuntimeHostOnboardingSurface(
  connection: RuntimeHostConnection,
): MakaOnboardingSurface {
  return {
    listProviders: async () => projectProviders(await readRuntimeHostConnectionCatalog(connection)),
    verify: async (input) => {
      try {
        const result = await connection.request('connection.onboarding.verify', {
          providerType: input.providerType,
          apiKey: normalizedSecret(input.apiKey),
        });
        return result.kind === 'verified'
          ? { kind: 'ok', models: [...result.models] }
          : { kind: 'error', failure: onboardingFailure(result) };
      } catch (error) {
        return { kind: 'error', failure: { kind: 'transport', detail: errorText(error) } };
      }
    },
    save: async (input) => {
      try {
        const result = await connection.request('connection.onboarding.save', {
          providerType: input.providerType,
          apiKey: normalizedSecret(input.apiKey),
          enabledModelIds: [...input.enabledModelIds],
        });
        if (result.kind !== 'saved') {
          return { kind: 'error', failure: onboardingFailure(result) };
        }
        return {
          kind: 'ok',
          modelChoices: projectRuntimeHostModelChoices(
            await readRuntimeHostConnectionCatalog(connection),
          ),
        };
      } catch (error) {
        return { kind: 'error', failure: { kind: 'transport', detail: errorText(error) } };
      }
    },
  };
}

export function projectRuntimeHostModelChoices(catalog: ConnectionCatalogSnapshot): ModelChoice[] {
  const choices: ModelChoice[] = [];
  for (const connection of catalog.connections) {
    // A retained retired connection stays enabled so its credential remains
    // visible and deletable, but every send through it is refused — offering
    // its models here would only let the user pick something that fails on
    // selection.
    if (!connection.enabled || isRetiredProvider(connection.providerType)) continue;
    const modelsById = new Map(connection.models.map((model) => [model.id, model]));
    const ids = new Set(connection.enabledModelIds);
    if (catalog.defaultTarget?.connectionId === connection.connectionId) {
      ids.add(catalog.defaultTarget.modelId);
    }
    for (const model of ids) {
      choices.push({
        connectionSlug: connection.slug,
        connectionName: connection.name,
        providerType: connection.providerType,
        model,
        displayName: modelsById.get(model)?.displayName,
        isDefaultConnection: catalog.defaultTarget?.connectionId === connection.connectionId,
        contextWindow: modelsById.get(model)?.contextWindow,
      });
    }
  }
  return choices;
}

function projectProviders(catalog: ConnectionCatalogSnapshot): OnboardingProviderEntry[] {
  const bySlug = new Map(catalog.connections.map((connection) => [connection.slug, connection]));
  return listApiKeyOnboardableProviders().map((provider) => {
    const candidate = bySlug.get(deriveConnectionSlug(provider.providerType));
    const existing = candidate?.providerType === provider.providerType ? candidate : undefined;
    return {
      ...provider,
      hasConnection: existing !== undefined,
      enabledModelIds: existing ? [...existing.enabledModelIds] : [],
    };
  });
}

function normalizedSecret(value: string | undefined): string | null {
  const secret = value?.trim() ?? '';
  return secret.length === 0 ? null : secret;
}

/**
 * Translate a Host onboarding outcome into a stable code. Presentation is the
 * TUI catalog's job (`onboardingFailureCopy`); nothing here is user-visible.
 */
function onboardingFailure(input: {
  readonly kind: 'rejected' | 'failed';
  readonly reason?: string;
  readonly errorClass?: string;
}): OnboardingFailure {
  if (input.kind === 'failed') {
    return { kind: 'verification_failed', errorClass: input.errorClass ?? 'unknown' };
  }
  return { kind: 'rejected', reason: rejectionReason(input.reason) };
}

function rejectionReason(reason: string | undefined): OnboardingRejectionReason {
  switch (reason) {
    case 'credential_not_configured':
    case 'provider_unsupported':
    case 'slug_conflict':
    case 'model_unavailable':
      return reason;
    default:
      return 'unknown';
  }
}

function errorText(error: unknown): string {
  return error instanceof Error ? error.message : String(error);
}
