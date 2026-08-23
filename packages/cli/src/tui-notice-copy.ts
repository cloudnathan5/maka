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
 * Locale-resolved copy for the notices the TUI runner pushes into the
 * transcript: command feedback, mode toggles, session moves, recap, goal
 * control, skill invocation, rewind, and exit.
 *
 * Transcript *rendering* copy lives in `tui-transcript-copy.ts`; this catalog
 * is only what the runner itself says back to the user.
 */
export interface TuiNoticeCopy {
  readonly commands: {
    readonly busy: (command: string) => string;
    readonly usage: (command: string) => string;
  };
  readonly model: {
    readonly changed: (previous: string, next: string) => string;
    readonly changedWithConnection: (
      previous: string,
      previousConnection: string,
      next: string,
      nextConnection: string,
    ) => string;
    readonly thinking: (level: string) => string;
    readonly thinkingDefault: string;
  };
  readonly modes: {
    readonly swarmBusy: string;
    readonly graphBusy: string;
    readonly swarmOn: string;
    readonly swarmOff: string;
    readonly swarmUnavailable: string;
    readonly swarmEnabled: string;
    readonly swarmDisabled: string;
    readonly swarmOnce: string;
    readonly graphOn: string;
    readonly graphOff: string;
    readonly graphUnavailable: string;
    readonly graphEnabled: string;
    readonly graphDisabled: string;
    readonly graphOnce: string;
    readonly graphHistoryUnavailable: string;
    readonly graphNoRuns: string;
  };
  readonly session: {
    readonly moveUnavailable: string;
    readonly moved: (cwd: string) => string;
    readonly moveWarning: (previousCwd: string) => string;
    readonly alreadyAt: (cwd: string) => string;
    readonly resumed: (name: string) => string;
    readonly renamed: (name: string) => string;
    readonly detached: string;
    readonly questionsUnavailable: string;
    readonly resumeFailed: (sessionId: string, detail: string) => string;
    readonly cwdMissing: string;
    readonly resumeFailedStartingFresh: (
      sessionId: string,
      detail: string,
      recoveryHint: string,
    ) => string;
  };
  readonly recap: {
    readonly unavailable: string;
    readonly alreadyRunning: string;
    readonly nothingYet: string;
    readonly failed: (detail: string) => string;
    readonly result: (text: string) => string;
  };
  readonly context: {
    readonly compacting: string;
    readonly resumeUnavailable: string;
    readonly resuming: string;
  };
  readonly goal: {
    readonly statusUnavailable: string;
    readonly controlUnavailable: string;
    readonly none: string;
    readonly busy: string;
    readonly cannotPause: (status: string) => string;
    readonly cannotResume: (status: string) => string;
    readonly cannotClear: (status: string) => string;
    readonly cleared: string;
    readonly gone: string;
    readonly paused: string;
    readonly resumed: string;
  };
  readonly skills: {
    readonly failureReasons: Readonly<Record<string, string>>;
    readonly none: string;
    readonly usage: string;
    /** Separator between listed skill names. CJK uses the enumeration comma. */
    readonly listSeparator: string;
    readonly requestLimitExceeded: (limit: number, reason: string) => string;
    readonly failedToLoad: (labels: string, noRequestIssued: boolean) => string;
    readonly loaded: (names: string) => string;
  };
  readonly rewind: {
    readonly pending: string;
    readonly none: string;
    readonly blockedBusy: string;
    readonly revertedRefilled: string;
    readonly revertedHistory: string;
  };
  readonly exit: {
    readonly pressAgain: string;
  };
  /** Agent Graph lifecycle vocabulary, quoted by `/graph` status output. */
  readonly graphStatus: Readonly<Record<string, string>>;
  readonly graphHistory: {
    readonly runHeading: (epoch: number, isCurrent: boolean) => string;
    readonly settled: (status: string, settled: number, total: number) => string;
    readonly selectedResults: (results: string) => string;
    readonly none: string;
    readonly omittedOperators: (count: number) => string;
  };
  readonly externalConversation: {
    readonly readFailed: (detail: string) => string;
  };
}

const TUI_NOTICE_COPY = {
  zh: {
    commands: {
      busy: (command) => `无法在 turn 进行中执行 /${command} — 请中断（Esc）或等待其完成。`,
      usage: (command) => `用法：${command}`,
    },
    model: {
      changed: (previous, next) => `模型已切换：${previous} → ${next}`,
      changedWithConnection: (previous, previousConnection, next, nextConnection) =>
        `模型已切换：${previous}（${previousConnection}） → ${next}（${nextConnection}）`,
      thinking: (level) => `思考级别：${level}`,
      thinkingDefault: '思考级别：默认',
    },
    modes: {
      swarmBusy: '无法在 turn 进行中变更或启动 Swarm 模式。',
      graphBusy: '无法在 turn 进行中变更或启动 Graph 模式。',
      swarmOn: '本会话已开启 Swarm 模式。',
      swarmOff: '本会话未开启 Swarm 模式。',
      swarmUnavailable: '当前会话驱动不支持 Swarm 模式。',
      swarmEnabled: '已为本会话开启 Swarm 模式。',
      swarmDisabled: '已关闭 Swarm 模式。',
      swarmOnce: '仅本轮使用 Swarm 模式。',
      graphOn: '本会话已开启 Graph 模式。',
      graphOff: '未开启 Graph 模式。',
      graphUnavailable: '当前会话驱动不支持 Graph 模式。',
      graphEnabled: '已为本会话开启 Graph 模式。',
      graphDisabled: '已关闭 Graph 模式。',
      graphOnce: '仅本轮使用 Graph 模式。',
      graphHistoryUnavailable: '当前会话驱动不支持 Agent Graph 历史。',
      graphNoRuns: '本会话没有 Agent Graph 运行记录。',
    },
    session: {
      moveUnavailable: '当前运行环境不支持移动会话。',
      moved: (cwd) => `会话已移动到“${cwd}”。`,
      moveWarning: (previousCwd) => ` 注意：原目录“${previousCwd}”有未提交的改动。`,
      alreadyAt: (cwd) => `会话已经在“${cwd}”。`,
      resumed: (name) => `已恢复会话“${name}”`,
      renamed: (name) => `会话已重命名为“${name}”`,
      detached: '已从进行中的 Turn 分离 — 它仍在运行。用 /session 重新接入。',
      questionsUnavailable: '当前驱动不支持用户提问。',
      resumeFailed: (sessionId, detail) => `无法恢复会话 ${sessionId}：${detail}`,
      cwdMissing: '会话目录已不存在：',
      resumeFailedStartingFresh: (sessionId, detail, recoveryHint) =>
        `无法恢复会话 ${sessionId}：${detail}。${recoveryHint} 将新建会话。`,
    },
    recap: {
      unavailable: '当前运行环境不支持回顾。',
      alreadyRunning: '回顾已在生成中。',
      nothingYet: '暂时没有可回顾的内容。',
      failed: (detail) => `回顾失败：${detail}`,
      result: (text) => `回顾：${text}`,
    },
    context: {
      compacting: '正在压缩上下文…',
      resumeUnavailable: '当前运行环境不支持安全边界恢复。',
      resuming: '正在从最近的安全边界恢复…',
    },
    goal: {
      statusUnavailable: '当前运行环境不支持目标状态。',
      controlUnavailable: '当前运行环境不支持目标控制。',
      none: '未设置目标。',
      busy: '无法在 turn 或其他操作进行中控制目标 — 请中断（Esc）或等待其完成。',
      cannotPause: (status) => `无法暂停：目标当前为${status}。`,
      cannotResume: (status) => `无法继续：目标当前为${status}。`,
      cannotClear: (status) => `无法清除：目标当前为${status}。`,
      cleared: '目标已清除。',
      gone: '该目标已不存在。',
      paused: '目标已暂停。/goal resume 继续，/goal clear 停止。',
      resumed: '目标已继续。',
    },
    skills: {
      failureReasons: {
        not_found: '未找到',
        disabled: '已禁用',
        host_incompatible: '当前主机缺少其依赖的工具',
        invalid_name: '名称无效',
        too_many_requests: '调用请求过多',
      },
      none: '当前没有可调用的技能。',
      usage: '用法：/skill，或直接在消息中输入 /skill:<name>',
      listSeparator: '、',
      requestLimitExceeded: (limit, reason) => `请求超过 ${limit} 个上限（${reason}）`,
      failedToLoad: (labels, noRequestIssued) =>
        `未能加载技能 ${labels}；${
          noRequestIssued ? '未发起模型请求。' : '失败的调用标记未发送给模型。'
        }`,
      loaded: (names) => `已加载技能：${names}`,
    },
    rewind: {
      pending: '正在回退到该轮之前…',
      none: '没有可回退的轮次。',
      blockedBusy: '无法回退：当前有正在进行的操作 — 请等待其完成，或中断（Esc）后重试。',
      revertedRefilled:
        '已回退到该轮之前（分支为新任务，原任务保留），该轮 prompt 已回填输入框，可修改后重新发送。',
      revertedHistory:
        '已回退到该轮之前（分支为新任务，原任务保留）。输入框已有未发送内容，未覆盖；该轮 prompt 已存入输入历史，可按 ↑ 找回。',
    },
    exit: {
      pressAgain: '再按一次 Ctrl+C 退出。',
    },
    graphStatus: {
      empty: '等待调度',
      active: '运行中',
      closing: '正在结束',
      waiting: '等待中',
      stopped: '已停止',
      failed: '已失败',
      completed: '已完成',
    },
    graphHistory: {
      runHeading: (epoch, isCurrent) =>
        `Agent Graph 第 ${epoch} 次运行${isCurrent ? ' · 当前' : ' · 历史（只读）'}`,
      settled: (status, settled, total) => `${status} · ${settled}/${total} 个算子已结束`,
      selectedResults: (results) => `已选结果：${results}`,
      none: '无',
      omittedOperators: (count) => `另有 ${count} 个算子未显示`,
    },
    externalConversation: {
      readFailed: (detail) => `读取外部对话失败：${detail}`,
    },
  },
  en: {
    commands: {
      busy: (command) =>
        `Cannot run /${command} while a turn is running — interrupt it (Esc) or wait for it to finish.`,
      usage: (command) => `Usage: ${command}`,
    },
    model: {
      changed: (previous, next) => `Model changed: ${previous} → ${next}`,
      changedWithConnection: (previous, previousConnection, next, nextConnection) =>
        `Model changed: ${previous} (${previousConnection}) → ${next} (${nextConnection})`,
      thinking: (level) => `Thinking: ${level}`,
      thinkingDefault: 'Thinking: default',
    },
    modes: {
      swarmBusy: 'Cannot change or start Swarm Mode while a turn is running.',
      graphBusy: 'Cannot change or start Graph Mode while a turn is running.',
      swarmOn: 'Swarm Mode is on for this session.',
      swarmOff: 'Swarm Mode is off for this session.',
      swarmUnavailable: 'Swarm Mode is unavailable on this session driver.',
      swarmEnabled: 'Swarm Mode enabled for this session.',
      swarmDisabled: 'Swarm Mode disabled.',
      swarmOnce: 'Using Swarm Mode for this turn only.',
      graphOn: 'Graph Mode is on for this session.',
      graphOff: 'Graph Mode is off.',
      graphUnavailable: 'Graph Mode is unavailable on this session driver.',
      graphEnabled: 'Graph Mode enabled for this session.',
      graphDisabled: 'Graph Mode disabled.',
      graphOnce: 'Using Graph Mode for this turn only.',
      graphHistoryUnavailable: 'Agent Graph history is unavailable on this session driver.',
      graphNoRuns: 'This session has no Agent Graph runs.',
    },
    session: {
      moveUnavailable: 'Moving sessions is not available in this environment.',
      moved: (cwd) => `Session moved to "${cwd}".`,
      moveWarning: (previousCwd) =>
        ` Warning: the old directory "${previousCwd}" has uncommitted changes.`,
      alreadyAt: (cwd) => `Session is already at "${cwd}".`,
      resumed: (name) => `Resumed session "${name}"`,
      renamed: (name) => `Session renamed to "${name}"`,
      detached: 'Detached from the running Turn — it keeps running. /session back to reattach.',
      questionsUnavailable: 'User questions are unavailable on this driver.',
      resumeFailed: (sessionId, detail) => `Could not resume session ${sessionId}: ${detail}`,
      cwdMissing: 'Session cwd no longer exists:',
      resumeFailedStartingFresh: (sessionId, detail, recoveryHint) =>
        `Could not resume session ${sessionId}: ${detail}.${recoveryHint} Starting fresh.`,
    },
    recap: {
      unavailable: 'Recap is not available in this environment.',
      alreadyRunning: 'Recap already running.',
      nothingYet: 'Nothing to recap yet.',
      failed: (detail) => `Recap failed: ${detail}`,
      result: (text) => `Recap: ${text}`,
    },
    context: {
      compacting: 'Compacting context…',
      resumeUnavailable: 'Safe-boundary resume is unavailable on this runtime.',
      resuming: 'Resuming from the latest safe boundary…',
    },
    goal: {
      statusUnavailable: 'Goal status is unavailable on this runtime.',
      controlUnavailable: 'Goal control is unavailable on this runtime.',
      none: 'No goal set.',
      busy: 'Cannot control the goal while a turn or another action is running — interrupt it (Esc) or wait for it to finish.',
      cannotPause: (status) => `Cannot pause: the goal is ${status}.`,
      cannotResume: (status) => `Cannot resume: the goal is ${status}.`,
      cannotClear: (status) => `Cannot clear: the goal is ${status}.`,
      cleared: 'Goal cleared.',
      gone: 'The goal no longer exists.',
      paused: 'Goal paused. /goal resume continues it, /goal clear stops it.',
      resumed: 'Goal resumed.',
    },
    skills: {
      failureReasons: {
        not_found: 'not found',
        disabled: 'disabled',
        host_incompatible: 'this host is missing a tool it depends on',
        invalid_name: 'invalid name',
        too_many_requests: 'too many invocation requests',
      },
      none: 'No invocable skills are available.',
      usage: 'Usage: /skill, or type /skill:<name> directly in a message',
      listSeparator: ', ',
      requestLimitExceeded: (limit, reason) =>
        `Requested more than the limit of ${limit} (${reason})`,
      failedToLoad: (labels, noRequestIssued) =>
        `Could not load skill ${labels}; ${
          noRequestIssued
            ? 'no model request was issued.'
            : 'the failed invocation markers were not sent to the model.'
        }`,
      loaded: (names) => `Loaded skills: ${names}`,
    },
    rewind: {
      pending: 'Rewinding to before that turn…',
      none: 'No turns are available to rewind.',
      blockedBusy:
        'Cannot rewind: an action is in flight — wait for it to finish, or interrupt (Esc) and retry.',
      revertedRefilled:
        'Rewound to before that turn (branched as a new task; the original is kept). That turn’s prompt is back in the input box — edit it and send again.',
      revertedHistory:
        'Rewound to before that turn (branched as a new task; the original is kept). Your unsent input was left untouched; that turn’s prompt went into the input history — press ↑ to get it back.',
    },
    exit: {
      pressAgain: 'Press Ctrl+C again to exit.',
    },
    graphStatus: {
      empty: 'Awaiting schedule',
      active: 'Running',
      closing: 'Finishing',
      waiting: 'Waiting',
      stopped: 'Stopped',
      failed: 'Failed',
      completed: 'Completed',
    },
    graphHistory: {
      runHeading: (epoch, isCurrent) =>
        `Agent Graph run #${epoch}${isCurrent ? ' · Current' : ' · History (read-only)'}`,
      settled: (status, settled, total) => `${status} · ${settled}/${total} operators settled`,
      selectedResults: (results) => `Selected results: ${results}`,
      none: 'none',
      omittedOperators: (count) => `${count} more operators omitted`,
    },
    externalConversation: {
      readFailed: (detail) => `Could not read the external conversation: ${detail}`,
    },
  },
} satisfies UiCatalog<TuiNoticeCopy>;

export function getTuiNoticeCopy(locale: UiLocale): TuiNoticeCopy {
  return TUI_NOTICE_COPY[locale];
}
