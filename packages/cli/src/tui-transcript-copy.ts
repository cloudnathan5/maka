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
 * Locale-resolved copy for transcript rendering and the notices the transcript
 * reducer records while folding runtime events.
 *
 * Notices are built at reduce time and stored as text, so the reducer reads
 * the locale off `MakaPiTranscriptState` rather than off render metadata.
 */
export interface TuiTranscriptCopy {
  readonly toggle: {
    readonly expanded: string;
    readonly collapsed: string;
    readonly noToolCardInView: (nextState: string) => string;
    readonly noThinkingInView: (nextState: string) => string;
  };
  readonly compact: {
    readonly nothingToCompact: string;
  };
  readonly access: {
    readonly expanded: string;
    readonly unchanged: string;
    readonly changed: (outcome: string) => string;
  };
  readonly plan: {
    readonly submitted: (title: string) => string;
  };
  readonly stopped: {
    readonly reason: (reason: string) => string;
    readonly maxTokens: string;
  };
  readonly tool: {
    readonly interruptedBeforeResult: string;
  };
  readonly compaction: {
    readonly compacted: (kind: string) => string;
    readonly coverage: (turns: string, events: string) => string;
    readonly saved: (tokens: number) => string;
    readonly skipped: (reason: string) => string;
  };
  readonly systemNote: {
    readonly modeChange: string;
    readonly modelChange: string;
    readonly contextCompacted: string;
    readonly compactionFailedOpen: string;
    readonly error: string;
    readonly abort: string;
  };
  readonly permissionMode: {
    readonly fullAccess: string;
    readonly readOnly: string;
    readonly auto: string;
  };
  readonly activity: {
    readonly retryingIn: (seconds: number, attempt: number, maxAttempts: number) => string;
    readonly retrying: (attempt: number, maxAttempts: number) => string;
    readonly working: (elapsed: string) => string;
  };
  readonly queue: {
    readonly steering: string;
    readonly queued: string;
    readonly pendingQueueHint: string;
  };
  readonly background: {
    readonly completed: string;
    readonly stopped: string;
    readonly timedOut: string;
    readonly task: (verb: string, command: string, suffix: string, failure: string) => string;
  };
  readonly provenance: {
    readonly legacyAutomation: string;
    readonly goalContinuation: string;
  };
  readonly sandbox: {
    readonly allowPrompt: string;
    readonly networkEnabled: string;
    readonly allowHint: string;
    readonly denyHint: string;
  };
}

const TUI_TRANSCRIPT_COPY = {
  zh: {
    toggle: {
      expanded: '展开',
      collapsed: '折叠',
      noToolCardInView: (nextState) =>
        `视图内没有可切换的工具卡片 — 上方的卡片保持已渲染的样子留在回滚区。新的工具输出将以${nextState}状态开始。`,
      noThinkingInView: (nextState) =>
        `视图内没有可切换的思考内容 — 上方的思考保持已渲染的样子留在回滚区。新的思考内容将以${nextState}状态开始。`,
    },
    compact: {
      nothingToCompact: '没有可压缩的内容。',
    },
    access: {
      expanded: '已放宽',
      unchanged: '未变更',
      changed: (outcome) => `访问权限${outcome}`,
    },
    plan: {
      submitted: (title) => `已提交计划：${title}`,
    },
    stopped: {
      reason: (reason) => `已停止：${reason}`,
      maxTokens: '已停止：达到最大 token 数',
    },
    tool: {
      interruptedBeforeResult: '工具尚未返回结果就被中断。',
    },
    compaction: {
      compacted: (kind) => `上下文已压缩：${kind}`,
      coverage: (turns, events) => `${turns} 轮 / ${events} 个事件`,
      saved: (tokens) => `节省约 ${tokens} tokens`,
      skipped: (reason) => `已跳过上下文压缩：${reason}。`,
    },
    systemNote: {
      modeChange: '权限模式已变更。',
      modelChange: '模型已变更。',
      contextCompacted: '已压缩上下文，以便本任务保持在模型窗口内。',
      compactionFailedOpen: '上下文摘要失败；会话在没有新摘要的情况下继续。',
      error: '会话记录到一个错误。',
      abort: '会话已停止。',
    },
    permissionMode: {
      fullAccess: '完全访问',
      readOnly: '只读',
      auto: '自动',
    },
    activity: {
      retryingIn: (seconds, attempt, maxAttempts) =>
        `${seconds} 秒后重试（${attempt}/${maxAttempts}）`,
      retrying: (attempt, maxAttempts) => `正在重试（${attempt}/${maxAttempts}）`,
      working: (elapsed) => `处理中… ${elapsed}`,
    },
    queue: {
      steering: '介入：',
      queued: '排队：',
      pendingQueueHint: 'alt+↑ 取回队列以重新编辑',
    },
    background: {
      completed: '已完成',
      stopped: '已停止',
      timedOut: '已超时',
      task: (verb, command, suffix, failure) => `后台任务${verb}：${command}${suffix}${failure}`,
    },
    provenance: {
      legacyAutomation: '历史自动化（仅历史记录）',
      goalContinuation: '目标续跑（自主）',
    },
    sandbox: {
      allowPrompt: '允许访问工作区之外的内容？',
      networkEnabled: '已启用网络',
      allowHint: '/Enter 本任务内允许',
      denyHint: '/Esc 拒绝',
    },
  },
  en: {
    toggle: {
      expanded: 'expanded',
      collapsed: 'collapsed',
      noToolCardInView: (nextState) =>
        `No tool card in view to toggle — cards above stay as rendered in scrollback. New tool output starts ${nextState}.`,
      noThinkingInView: (nextState) =>
        `No thinking in view to toggle — thinking above stays as rendered in scrollback. New thinking starts ${nextState}.`,
    },
    compact: {
      nothingToCompact: 'Nothing to compact.',
    },
    access: {
      expanded: 'expanded',
      unchanged: 'unchanged',
      changed: (outcome) => `Access ${outcome}`,
    },
    plan: {
      submitted: (title) => `Plan submitted: ${title}`,
    },
    stopped: {
      reason: (reason) => `Stopped: ${reason}`,
      maxTokens: 'Stopped: max tokens',
    },
    tool: {
      interruptedBeforeResult: 'Interrupted before the tool returned a result.',
    },
    compaction: {
      compacted: (kind) => `Context compacted: ${kind}`,
      coverage: (turns, events) => `${turns} turns / ${events} events`,
      saved: (tokens) => `saved ~${tokens} tokens`,
      skipped: (reason) => `Context compaction skipped: ${reason}.`,
    },
    systemNote: {
      modeChange: 'Permission mode changed.',
      modelChange: 'Model changed.',
      contextCompacted: 'Context compacted to keep this task within the model window.',
      compactionFailedOpen: 'Context summary failed; the session continued without a new summary.',
      error: 'Session recorded an error.',
      abort: 'Session was stopped.',
    },
    permissionMode: {
      fullAccess: 'Full access',
      readOnly: 'Read only',
      auto: 'Auto',
    },
    activity: {
      retryingIn: (seconds, attempt, maxAttempts) =>
        `Retrying in ${seconds}s (${attempt}/${maxAttempts})`,
      retrying: (attempt, maxAttempts) => `Retrying (${attempt}/${maxAttempts})`,
      working: (elapsed) => `Working… ${elapsed}`,
    },
    queue: {
      steering: 'Steering:',
      queued: 'Queued:',
      pendingQueueHint: 'alt+↑ bring the queue back to edit',
    },
    background: {
      completed: 'completed',
      stopped: 'stopped',
      timedOut: 'timed out',
      task: (verb, command, suffix, failure) =>
        `Background task ${verb}: ${command}${suffix}${failure}`,
    },
    provenance: {
      legacyAutomation: 'Legacy Automation (history only)',
      goalContinuation: 'Goal continuation (autonomous)',
    },
    sandbox: {
      allowPrompt: 'Allow access outside the workspace?',
      networkEnabled: 'network enabled',
      allowHint: '/Enter allow for this task',
      denyHint: '/Esc deny',
    },
  },
} satisfies UiCatalog<TuiTranscriptCopy>;

export function getTuiTranscriptCopy(locale: UiLocale): TuiTranscriptCopy {
  return TUI_TRANSCRIPT_COPY[locale];
}
