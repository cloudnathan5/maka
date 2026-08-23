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

/**
 * Locale-resolved copy for the autonomous-goal surfaces: the `/goal` summary,
 * the pause and attach notices, and the status names those lines quote.
 *
 * The compact status-line token (`goal 3/50 12m`) stays as it is: it is a
 * fixed-width badge next to `ctx` and `cache`, not prose.
 */
export interface TuiGoalCopy {
  readonly status: Readonly<Record<string, string>>;
  readonly pausedNotice: (iterations: number, maxIterations: number, reason: string) => string;
  readonly attachedNotice: (iterations: number, maxIterations: number, condition: string) => string;
  readonly summary: {
    readonly goal: (condition: string) => string;
    readonly clearedGoal: (condition: string) => string;
    readonly statusLine: (status: string, iterations: number, maxIterations: number) => string;
    readonly tokensWithBudget: (spent: string, budget: string) => string;
    readonly tokens: (spent: string) => string;
    readonly lastEvaluatorNote: (note: string) => string;
  };
}

const TUI_GOAL_COPY = {
  zh: {
    status: {
      active: '进行中',
      waiting: '等待中',
      paused: '已暂停',
      achieved: '已达成',
      impossible: '无法达成',
      cleared: '已清除',
      stalled: '已停滞',
      budget_limited: '预算受限',
      max_iterations: '达到迭代上限',
    },
    pausedNotice: (iterations, maxIterations, reason) =>
      `目标已暂停（${iterations}/${maxIterations}）。${reason} /goal resume 继续，/goal clear 停止。`,
    attachedNotice: (iterations, maxIterations, condition) =>
      `自主目标运行中（${iterations}/${maxIterations}）：${condition} — /goal 查看详情，/goal pause 暂停。`,
    summary: {
      goal: (condition) => `目标：${condition}`,
      clearedGoal: (condition) => `已清除的目标：${condition}`,
      statusLine: (status, iterations, maxIterations) =>
        `状态：${status} · ${iterations}/${maxIterations} 次迭代`,
      tokensWithBudget: (spent, budget) => `Tokens：${spent} / ${budget}`,
      tokens: (spent) => `Tokens：${spent}`,
      lastEvaluatorNote: (note) => `最近一次评估说明：${note}`,
    },
  },
  en: {
    status: {
      active: 'active',
      waiting: 'waiting',
      paused: 'paused',
      achieved: 'achieved',
      impossible: 'impossible',
      cleared: 'cleared',
      stalled: 'stalled',
      budget_limited: 'budget limited',
      max_iterations: 'iteration limit',
    },
    pausedNotice: (iterations, maxIterations, reason) =>
      `Goal paused (${iterations}/${maxIterations}).${reason} /goal resume continues it, /goal clear stops it.`,
    attachedNotice: (iterations, maxIterations, condition) =>
      `Autonomous goal is running (${iterations}/${maxIterations}): ${condition} — /goal shows details, /goal pause pauses it.`,
    summary: {
      goal: (condition) => `Goal: ${condition}`,
      clearedGoal: (condition) => `Cleared goal: ${condition}`,
      statusLine: (status, iterations, maxIterations) =>
        `Status: ${status} · ${iterations}/${maxIterations} iterations`,
      tokensWithBudget: (spent, budget) => `Tokens: ${spent} / ${budget}`,
      tokens: (spent) => `Tokens: ${spent}`,
      lastEvaluatorNote: (note) => `Last evaluator note: ${note}`,
    },
  },
} satisfies UiCatalog<TuiGoalCopy>;

export function getTuiGoalCopy(locale: UiLocale): TuiGoalCopy {
  return TUI_GOAL_COPY[locale];
}
