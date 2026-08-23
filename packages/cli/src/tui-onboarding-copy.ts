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

import type { UiCatalog, UiLocale } from '@maka/core/ui-locale';
import type { OnboardingFailure } from './pi-tui-contracts.js';

/**
 * Locale-resolved copy for the `/setup` provider wizard.
 *
 * The Host reports onboarding outcomes as stable codes (`OnboardingFailure`),
 * never as prose: the wire vocabulary stays locale-independent and this
 * catalog is the only place that turns a code into something a human reads.
 * That split is the reason `onboardingFailureCopy` lives here rather than in
 * `runtime-host-onboarding.ts`, which used to hold English sentences that no
 * locale could override.
 */
export interface TuiOnboardingCopy {
  readonly title: string;
  /** Step marker rendered beside the title, e.g. `· 1/3`. */
  readonly step: (index: number, total: number) => string;
  readonly doneStep: string;
  readonly searchHint: string;
  readonly searchLabel: string;
  readonly noProviders: string;
  /** Marks a provider that already has a saved connection. */
  readonly configured: string;
  readonly apiKeyLabel: string;
  readonly keyHintRotate: string;
  readonly keyHintNew: string;
  readonly enterSubmit: string;
  readonly enterClose: string;
  readonly verifyingKey: string;
  readonly modelsHint: string;
  readonly noModels: string;
  readonly selectAtLeastOneModel: string;
  readonly saving: string;
  readonly selectedWithSave: (count: number) => string;
  readonly selected: (count: number) => string;
  readonly enabledModels: (count: number) => string;
  readonly unavailable: string;
  readonly noApiKeyProviders: string;
  readonly keyVerifyFailed: (detail: string) => string;
  readonly setupFailed: (detail: string) => string;
  readonly saveFailed: (detail: string) => string;
  readonly readConnectionsFailed: (detail: string) => string;
  /** Host-reported outcomes, keyed by the code the Host sends. */
  readonly failures: {
    readonly credentialNotConfigured: string;
    readonly providerUnsupported: string;
    readonly slugConflict: string;
    readonly modelUnavailable: string;
    readonly rejected: string;
    readonly verificationFailed: (errorClass: string) => string;
  };
}

const TUI_ONBOARDING_COPY = {
  zh: {
    title: '配置服务商',
    step: (index, total) => `· ${index}/${total}`,
    doneStep: '完成',
    searchHint: '搜索服务商，↑↓ 选择 · Enter 确认 · Esc 取消',
    searchLabel: '搜索',
    noProviders: '没有匹配的服务商',
    configured: '已设置',
    apiKeyLabel: 'API key',
    keyHintRotate: '留空复用已保存的 key，或输入新 key 轮换 · Esc 返回选择服务商',
    keyHintNew: '输入 API key · 仅本机存储 · Esc 返回选择服务商',
    enterSubmit: 'Enter 提交',
    enterClose: 'Enter 关闭',
    verifyingKey: '正在验证 key…',
    modelsHint: '搜索模型，↑↓ 选择 · Space 切换 · Enter 保存 · Esc 返回',
    noModels: '没有匹配的模型',
    selectAtLeastOneModel: '保存前请至少选择一个模型',
    saving: '正在保存…',
    selectedWithSave: (count) => `已选 ${count} 个 · Enter 保存`,
    selected: (count) => `已选 ${count} 个`,
    enabledModels: (count) => `✓ 已启用 ${count} 个模型`,
    unavailable: 'Onboarding 不可用：当前运行环境未提供配置入口。',
    noApiKeyProviders: '没有可配置的 API key 类供应商。',
    keyVerifyFailed: (detail) => `API key 验证失败：${detail}。请检查后重新输入。`,
    setupFailed: (detail) => `配置失败：${detail}`,
    saveFailed: (detail) => `保存失败：${detail}`,
    readConnectionsFailed: (detail) => `无法读取已配置的连接：${detail}`,
    failures: {
      credentialNotConfigured: '需要填写 API key',
      providerUnsupported: '该服务商不支持 API key 配置',
      slugConflict: '该连接名已被其他服务商占用',
      modelUnavailable: '所选模型已不可用',
      rejected: '连接配置被拒绝',
      verificationFailed: (errorClass) => `连接验证失败：${errorClass}`,
    },
  },
  en: {
    title: 'Set Up Provider',
    step: (index, total) => `· ${index}/${total}`,
    doneStep: 'Done',
    searchHint: 'Search providers · ↑↓ select · Enter confirm · Esc cancel',
    searchLabel: 'Search',
    noProviders: 'No matching providers',
    configured: 'configured',
    apiKeyLabel: 'API key',
    keyHintRotate:
      'Leave blank to reuse the saved key, or enter a new key to rotate · Esc back to providers',
    keyHintNew: 'Enter your API key · stored on this machine only · Esc back to providers',
    enterSubmit: 'Enter submit',
    enterClose: 'Enter close',
    verifyingKey: 'Verifying key…',
    modelsHint: 'Search models · ↑↓ select · Space toggle · Enter save · Esc back',
    noModels: 'No matching models',
    selectAtLeastOneModel: 'Select at least one model before saving',
    saving: 'Saving…',
    selectedWithSave: (count) => `${count} selected · Enter save`,
    selected: (count) => `${count} selected`,
    enabledModels: (count) => `✓ Enabled ${count} ${count === 1 ? 'model' : 'models'}`,
    unavailable: 'Onboarding unavailable: this host exposes no configuration entry point.',
    noApiKeyProviders: 'No API-key providers are available to configure.',
    keyVerifyFailed: (detail) => `API key verification failed: ${detail}. Check it and try again.`,
    setupFailed: (detail) => `Setup failed: ${detail}`,
    saveFailed: (detail) => `Save failed: ${detail}`,
    readConnectionsFailed: (detail) => `Could not read the configured connections: ${detail}`,
    failures: {
      credentialNotConfigured: 'API key is required',
      providerUnsupported: 'This provider does not support API-key onboarding',
      slugConflict: 'The provider connection name is already used by another provider',
      modelUnavailable: 'The selected model is no longer available',
      rejected: 'Connection onboarding was rejected',
      verificationFailed: (errorClass) => `Connection verification failed: ${errorClass}`,
    },
  },
} satisfies UiCatalog<TuiOnboardingCopy>;

export function getTuiOnboardingCopy(locale: UiLocale): TuiOnboardingCopy {
  return TUI_ONBOARDING_COPY[locale];
}

/** Render one Host-reported onboarding outcome in the resolved locale. */
export function onboardingFailureCopy(failure: OnboardingFailure, locale: UiLocale): string {
  const copy = getTuiOnboardingCopy(locale).failures;
  switch (failure.kind) {
    case 'verification_failed':
      return copy.verificationFailed(failure.errorClass);
    // A transport failure carries the thrown message, which no catalog can
    // translate. Surface it as-is rather than hiding the only detail there is.
    case 'transport':
      return failure.detail;
    case 'rejected':
      switch (failure.reason) {
        case 'credential_not_configured':
          return copy.credentialNotConfigured;
        case 'provider_unsupported':
          return copy.providerUnsupported;
        case 'slug_conflict':
          return copy.slugConflict;
        case 'model_unavailable':
          return copy.modelUnavailable;
        default:
          return copy.rejected;
      }
  }
}
