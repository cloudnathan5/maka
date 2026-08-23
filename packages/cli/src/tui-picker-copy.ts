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
 * Locale-resolved copy for the TUI overlays: the pickers themselves and the
 * titles and hints the runner hands them when it opens one.
 *
 * The overlays own their own chrome, but the runner owns the titles, so both
 * sides read the same catalog rather than each holding its own literals. Copy
 * for the `/setup` wizard lives in `tui-onboarding-copy.ts` — the wizard is a
 * separate presentation area with its own Host-side failure vocabulary.
 */
export interface TuiPickerCopy {
  readonly chrome: {
    /** Default footer hint for a plain select overlay. */
    readonly selectHint: string;
  };
  readonly model: {
    readonly title: string;
    readonly hint: string;
    readonly searchLabel: string;
    readonly empty: string;
    readonly cacheWarning: string;
  };
  readonly move: {
    readonly title: string;
    readonly hint: string;
    readonly directoryLabel: string;
    readonly current: (cwd: string) => string;
  };
  readonly permissions: {
    readonly pickerTitle: string;
    readonly title: (mode: string) => string;
    readonly auto: string;
    readonly fullAccess: string;
    readonly protectedScope: string;
    readonly unprotectedScope: string;
    /** Prefixes the description of the mode already in effect. */
    readonly currentPrefix: string;
    readonly confirmTitle: string;
    readonly keepAuto: string;
    readonly keepAutoDetail: string;
    readonly enableFullAccess: string;
    readonly enableFullAccessDetail: string;
  };
  readonly thinking: {
    readonly title: string;
    readonly levels: Readonly<Record<string, string>>;
    readonly default: string;
    readonly unsupported: string;
  };
  readonly skill: {
    readonly title: string;
  };
  readonly session: {
    readonly title: string;
    readonly hint: string;
    readonly scopeCurrent: string;
    readonly scopeAll: string;
    readonly resumeFrom: (source: string) => string;
  };
  readonly graph: {
    readonly title: string;
    readonly hint: string;
    readonly current: string;
    readonly historyReadOnly: string;
    readonly run: (epoch: number, isCurrent: boolean) => string;
    readonly runCount: (count: number) => string;
    readonly runCountCapped: (count: number) => string;
  };
  readonly question: {
    readonly hint: string;
    readonly placeholder: string;
    readonly progress: (index: number, total: number) => string;
  };
  readonly rewind: {
    readonly hint: string;
  };
  readonly transcriptViewer: {
    readonly title: string;
    readonly hint: string;
  };
}

const TUI_PICKER_COPY = {
  zh: {
    chrome: {
      selectHint: 'enter 选择 / esc 关闭',
    },
    model: {
      title: '选择模型',
      hint: '搜索模型 / 服务商 / 连接 · ↑↓ 选择 · Enter 确认 · Esc 取消',
      searchLabel: '搜索',
      empty: '没有匹配的模型',
      cacheWarning: '⚠ 切换模型可能需要重建提示缓存；下一次请求可能更慢或成本更高。',
    },
    move: {
      title: '移动会话',
      hint: '输入目录 · Tab 补全 · Enter 确认 · Esc 取消',
      directoryLabel: '目录 ',
      current: (cwd) => `当前：${cwd}`,
    },
    permissions: {
      pickerTitle: '权限',
      title: (mode) => `权限：${mode}`,
      auto: '自动',
      fullAccess: '完全访问',
      protectedScope: '受保护',
      unprotectedScope: '直接访问你的文件和网络，不受保护',
      currentPrefix: '当前 · ',
      confirmTitle: '切换到完全访问？',
      keepAuto: '保持自动',
      keepAutoDetail: '留在受保护的环境内',
      enableFullAccess: '开启完全访问',
      enableFullAccessDetail:
        '直接访问你的文件和网络；仅用于可信任务，或已在外部隔离的环境中运行的任务',
    },
    thinking: {
      title: '选择思考级别',
      levels: {
        off: '关',
        minimal: '最小',
        low: '低',
        medium: '中',
        high: '高',
        xhigh: '超高',
        max: '最高',
      },
      default: '默认',
      unsupported: '当前模型不支持思考级别切换。',
    },
    skill: {
      title: '调用技能',
    },
    session: {
      title: '恢复会话',
      hint: 'Tab 切换范围 · ↑↓ 移动 · Enter 选择 · Esc 关闭',
      scopeCurrent: '当前目录',
      scopeAll: '全部',
      resumeFrom: (source) => `↩ 从 ${source} 恢复`,
    },
    graph: {
      title: 'Agent Graph 历史',
      hint: '↑↓ 移动 · Enter 查看 · Esc 关闭',
      current: '当前 Graph',
      historyReadOnly: '历史 · 只读',
      run: (epoch, isCurrent) => `第 ${epoch} 次运行${isCurrent ? ' · 当前' : ''}`,
      runCount: (count) => `${count} 次运行`,
      runCountCapped: (count) => `最近 ${count} 次运行（历史有上限）`,
    },
    question: {
      hint: '↑↓ 移动 · 输入以作答 · Enter 选择 · Esc 不作答 · Ctrl+C 停止',
      placeholder: '其他：输入你的回答…',
      progress: (index, total) => `${index} / ${total}`,
    },
    rewind: {
      hint: '回到选定轮次之前（丢弃该轮及之后，prompt 回填输入框） · enter 选择 / esc 取消',
    },
    transcriptViewer: {
      title: '完整记录',
      hint: '↑/↓ 滚动 · PgUp/PgDn 翻页 · Home/End 跳转 · q/Esc 关闭',
    },
  },
  en: {
    chrome: {
      selectHint: 'enter select / esc close',
    },
    model: {
      title: 'Select Model',
      hint: 'Search models / providers / connections · ↑↓ select · Enter confirm · Esc cancel',
      searchLabel: 'Search',
      empty: 'No matching models',
      cacheWarning:
        '⚠ Switching models may rebuild the prompt cache; the next request can be slower or cost more.',
    },
    move: {
      title: 'Move Session',
      hint: 'Type a directory · Tab complete · Enter confirm · Esc cancel',
      directoryLabel: 'Directory ',
      current: (cwd) => `Current: ${cwd}`,
    },
    permissions: {
      pickerTitle: 'Permissions',
      title: (mode) => `Permissions: ${mode}`,
      auto: 'Auto',
      fullAccess: 'Full access',
      protectedScope: 'protected',
      unprotectedScope: 'your files and network, unprotected',
      currentPrefix: 'current · ',
      confirmTitle: 'Switch to full access?',
      keepAuto: 'Keep Auto',
      keepAutoDetail: 'Stay inside the protected environment',
      enableFullAccess: 'Turn on full access',
      enableFullAccessDetail:
        'Reach your files and your network directly; use only for trusted or externally isolated tasks',
    },
    thinking: {
      title: 'Select Thinking Level',
      levels: {
        off: 'Off',
        minimal: 'Minimal',
        low: 'Low',
        medium: 'Medium',
        high: 'High',
        xhigh: 'Extra high',
        max: 'Max',
      },
      default: 'Default',
      unsupported: 'The current model does not support switching thinking level.',
    },
    skill: {
      title: 'Invoke Skill',
    },
    session: {
      title: 'Resume Session',
      hint: 'Tab scope · ↑↓ move · Enter select · Esc close',
      scopeCurrent: 'Current',
      scopeAll: 'All',
      resumeFrom: (source) => `↩ resume from ${source}`,
    },
    graph: {
      title: 'Agent Graph History',
      hint: '↑↓ move · Enter inspect · Esc close',
      current: 'Current graph',
      historyReadOnly: 'History · read-only',
      run: (epoch, isCurrent) => `Run #${epoch}${isCurrent ? ' · Current' : ''}`,
      runCount: (count) => `${count} run${count === 1 ? '' : 's'}`,
      runCountCapped: (count) => `newest ${count} runs (history capped)`,
    },
    question: {
      hint: '↑↓ move · type to answer · Enter select · Esc unanswered · Ctrl+C stop',
      placeholder: 'Other: type your answer…',
      progress: (index, total) => `${index} / ${total}`,
    },
    rewind: {
      hint: 'Rewind to before the selected turn (drops that turn and later ones, refills the prompt) · enter select / esc cancel',
    },
    transcriptViewer: {
      title: 'TRANSCRIPT',
      hint: '↑/↓ scroll · PgUp/PgDn page · Home/End jump · q/Esc close',
    },
  },
} satisfies UiCatalog<TuiPickerCopy>;

export function getTuiPickerCopy(locale: UiLocale): TuiPickerCopy {
  return TUI_PICKER_COPY[locale];
}
