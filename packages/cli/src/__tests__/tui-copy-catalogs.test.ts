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

import assert from 'node:assert/strict';
import { readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, test } from 'node:test';
import { UI_LOCALES } from '@maka/core/ui-locale';
import { getTuiGoalCopy } from '../tui-goal-copy.js';
import { getTuiNoticeCopy } from '../tui-notice-copy.js';
import { getTuiOnboardingCopy } from '../tui-onboarding-copy.js';
import { getTuiPickerCopy } from '../tui-picker-copy.js';
import { getTuiPrimaryGuidance } from '../tui-primary-guidance.js';
import { getTuiTranscriptCopy } from '../tui-transcript-copy.js';

/** `dist/__tests__` → the `src` tree the sources were compiled from. */
const SRC_DIR = join(dirname(fileURLToPath(import.meta.url)), '..', '..', 'src');

/** Files allowed to hold locale-specific literals: the catalogs themselves. */
const CATALOG_FILES = new Set([
  'tui-goal-copy.ts',
  'tui-notice-copy.ts',
  'tui-onboarding-copy.ts',
  'tui-picker-copy.ts',
  'tui-primary-guidance.ts',
  'tui-session-status.ts',
  'tui-transcript-copy.ts',
]);

const CJK = /[一-鿿]/u;

/**
 * Structural fingerprint of a catalog: the key path of every leaf, with the
 * leaf's kind. Two locales must agree on it, or one locale is missing copy the
 * other renders — the failure `satisfies UiCatalog<T>` cannot see once a
 * catalog nests records keyed by runtime strings.
 */
function shape(value: unknown, path = ''): string[] {
  if (typeof value === 'function') return [`${path}:fn/${value.length}`];
  if (value && typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .flatMap(([key, child]) => shape(child, path ? `${path}.${key}` : key))
      .sort();
  }
  return [`${path}:${typeof value}`];
}

describe('TUI copy catalogs', () => {
  const catalogs = {
    goal: getTuiGoalCopy,
    notice: getTuiNoticeCopy,
    onboarding: getTuiOnboardingCopy,
    picker: getTuiPickerCopy,
    primaryGuidance: getTuiPrimaryGuidance,
    transcript: getTuiTranscriptCopy,
  };

  for (const [name, get] of Object.entries(catalogs)) {
    test(`${name} carries the same keys in every supported locale`, () => {
      const [first, ...rest] = UI_LOCALES;
      const reference = shape(get(first!));
      assert.ok(reference.length > 0, `${name} resolved to an empty catalog`);
      for (const locale of rest) {
        assert.deepEqual(
          shape(get(locale)),
          reference,
          `${name} differs between ${first} and ${locale}`,
        );
      }
    });
  }

  test('every locale renders a distinct string for the copy it owns', () => {
    // A catalog whose locales are byte-identical is copy that was never
    // translated — the exact regression this suite exists to catch. Product
    // names and key labels legitimately repeat, so compare whole catalogs.
    for (const [name, get] of Object.entries(catalogs)) {
      assert.notDeepEqual(
        JSON.stringify(get('zh')),
        JSON.stringify(get('en')),
        `${name} renders identically in zh and en`,
      );
    }
  });

  test('no TUI source outside a catalog holds locale-specific literals', () => {
    // RFC #2672 asks the repository to reject new hardcoded user-facing copy.
    // CJK is the mechanically detectable half of that: English literals still
    // need review, but a Chinese literal outside a catalog is always a bug,
    // because it renders Chinese no matter what MAKA_LOCALE resolved to.
    const offenders: string[] = [];
    for (const file of readdirSync(SRC_DIR)) {
      if (!file.endsWith('.ts') || CATALOG_FILES.has(file)) continue;
      const source = readFileSync(join(SRC_DIR, file), 'utf8');
      source.split('\n').forEach((line, index) => {
        const code = line.trim();
        if (code.startsWith('*') || code.startsWith('//')) return;
        if (CJK.test(line)) offenders.push(`${file}:${index + 1}: ${code}`);
      });
    }
    assert.deepEqual(
      offenders,
      [],
      `move this copy into a *-copy.ts catalog:\n${offenders.join('\n')}`,
    );
  });
});
