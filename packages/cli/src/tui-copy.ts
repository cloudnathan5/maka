import type { UiCatalog, UiLocale } from '@maka/core/ui-locale';

/**
 * Locale-resolved copy for the interactive TUI surfaces that are not part of
 * the primary welcome/help guidance: the `/model` picker, the `/setup`
 * onboarding wizard, `/thinking`, `/skill`, rewind, and the pending-queue hint.
 *
 * These strings used to be Chinese literals inline in `pi-tui-pickers.ts`,
 * `pi-tui-runner.ts`, and `pi-transcript.ts`, which made the wizard render
 * Chinese regardless of `MAKA_LOCALE` or the POSIX locale variables. The
 * catalog shape mirrors `tui-primary-guidance.ts` so both halves of the TUI
 * resolve their copy the same way.
 */
export interface TuiCopy {
  readonly modelSearch: {
    readonly hint: string;
    readonly searchLabel: string;
    readonly empty: string;
    readonly cacheWarning: string;
  };
  readonly providerPicker: {
    /** Marks a provider that already has a saved connection. */
    readonly configured: string;
  };
  readonly thinking: {
    readonly levels: Readonly<Record<string, string>>;
    readonly default: string;
    readonly unsupported: string;
  };
  readonly wizard: {
    readonly searchHint: string;
    readonly searchLabel: string;
    readonly noProviders: string;
    readonly keyHintRotate: string;
    readonly keyHintNew: string;
    readonly enterSubmit: string;
    readonly verifyingKey: string;
    readonly modelsHint: string;
    readonly noModels: string;
    readonly selectAtLeastOneModel: string;
    readonly saving: string;
    readonly doneStep: string;
    readonly enterClose: string;
    readonly selectedWithSave: (count: number) => string;
    readonly selected: (count: number) => string;
    readonly enabledModels: (count: number) => string;
  };
  readonly onboarding: {
    readonly unavailable: string;
    readonly noApiKeyProviders: string;
    readonly keyVerifyFailed: (detail: string) => string;
    readonly setupFailed: (detail: string) => string;
    readonly saveFailed: (detail: string) => string;
    readonly readConnectionsFailed: (detail: string) => string;
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
    readonly none: string;
    readonly hint: string;
    readonly reverted: string;
  };
  readonly transcript: {
    readonly pendingQueueHint: string;
  };
  readonly externalConversation: {
    readonly readFailed: (detail: string) => string;
  };
}

const TUI_COPY = {
  zh: {
    modelSearch: {
      hint: '搜索模型 / 服务商 / 连接 · ↑↓ 选择 · Enter 确认 · Esc 取消',
      searchLabel: '搜索',
      empty: '没有匹配的模型',
      cacheWarning: '⚠ 切换模型可能需要重建提示缓存；下一次请求可能更慢或成本更高。',
    },
    providerPicker: {
      configured: '已设置',
    },
    thinking: {
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
    wizard: {
      searchHint: '搜索服务商，↑↓ 选择 · Enter 确认 · Esc 取消',
      searchLabel: '搜索',
      noProviders: '没有匹配的服务商',
      keyHintRotate: '留空复用已保存的 key，或输入新 key 轮换 · Esc 返回选择服务商',
      keyHintNew: '输入 API key · 仅本机存储 · Esc 返回选择服务商',
      enterSubmit: 'Enter 提交',
      verifyingKey: '正在验证 key…',
      modelsHint: '搜索模型，↑↓ 选择 · Space 切换 · Enter 保存 · Esc 返回',
      noModels: '没有匹配的模型',
      selectAtLeastOneModel: '至少选择一个模型再保存',
      saving: '正在保存…',
      doneStep: '完成',
      enterClose: 'Enter 关闭',
      selectedWithSave: (count) => `已选 ${count} · Enter 保存`,
      selected: (count) => `已选 ${count}`,
      enabledModels: (count) => `✓ 已启用 ${count} 个模型`,
    },
    onboarding: {
      unavailable: 'Onboarding 不可用：当前运行环境未提供配置入口。',
      noApiKeyProviders: '没有可配置的 API key 类供应商。',
      keyVerifyFailed: (detail) => `API key 验证失败：${detail}。请检查后重新输入。`,
      setupFailed: (detail) => `配置失败：${detail}`,
      saveFailed: (detail) => `保存失败：${detail}`,
      readConnectionsFailed: (detail) => `无法读取已配置的连接：${detail}`,
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
      usage: 'Usage: /skill，或直接在消息中输入 /skill:<name>',
      listSeparator: '、',
      requestLimitExceeded: (limit, reason) => `请求超过 ${limit} 个上限（${reason}）`,
      failedToLoad: (labels, noRequestIssued) =>
        `未能加载技能 ${labels}；${
          noRequestIssued ? '未发起模型请求。' : '失败的调用标记未发送给模型。'
        }`,
      loaded: (names) => `已加载技能：${names}`,
    },
    rewind: {
      none: '没有可回退的轮次。',
      hint: '回到选定轮次之前（丢弃该轮及之后，prompt 回填输入框） · enter 选择 / esc 取消',
      reverted:
        '已回退到该轮之前（分支为新任务，原任务保留），该轮 prompt 已回填输入框，可修改后重新发送。',
    },
    transcript: {
      pendingQueueHint: 'alt+↑ 取回队列以重新编辑',
    },
    externalConversation: {
      readFailed: (detail) => `读取外部对话失败：${detail}`,
    },
  },
  en: {
    modelSearch: {
      hint: 'Search models / providers / connections · ↑↓ select · Enter confirm · Esc cancel',
      searchLabel: 'Search',
      empty: 'No matching models',
      cacheWarning:
        '⚠ Switching models may rebuild the prompt cache; the next request can be slower or cost more.',
    },
    providerPicker: {
      configured: 'configured',
    },
    thinking: {
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
    wizard: {
      searchHint: 'Search providers · ↑↓ select · Enter confirm · Esc cancel',
      searchLabel: 'Search',
      noProviders: 'No matching providers',
      keyHintRotate:
        'Leave blank to reuse the saved key, or enter a new key to rotate · Esc back to providers',
      keyHintNew: 'Enter your API key · stored on this machine only · Esc back to providers',
      enterSubmit: 'Enter submit',
      verifyingKey: 'Verifying key…',
      modelsHint: 'Search models · ↑↓ select · Space toggle · Enter save · Esc back',
      noModels: 'No matching models',
      selectAtLeastOneModel: 'Select at least one model before saving',
      saving: 'Saving…',
      doneStep: 'Done',
      enterClose: 'Enter close',
      selectedWithSave: (count) => `${count} selected · Enter save`,
      selected: (count) => `${count} selected`,
      enabledModels: (count) => `✓ Enabled ${count} ${count === 1 ? 'model' : 'models'}`,
    },
    onboarding: {
      unavailable: 'Onboarding unavailable: this host exposes no configuration entry point.',
      noApiKeyProviders: 'No API-key providers are available to configure.',
      keyVerifyFailed: (detail) =>
        `API key verification failed: ${detail}. Check it and try again.`,
      setupFailed: (detail) => `Setup failed: ${detail}`,
      saveFailed: (detail) => `Save failed: ${detail}`,
      readConnectionsFailed: (detail) => `Could not read the configured connections: ${detail}`,
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
      none: 'No turns are available to rewind.',
      hint: 'Rewind to before the selected turn (drops that turn and later ones, refills the prompt) · enter select / esc cancel',
      reverted:
        'Rewound to before that turn (branched as a new task; the original is kept). That turn’s prompt is back in the input box — edit it and send again.',
    },
    transcript: {
      pendingQueueHint: 'alt+↑ bring the queue back to edit',
    },
    externalConversation: {
      readFailed: (detail) => `Could not read the external conversation: ${detail}`,
    },
  },
} satisfies UiCatalog<TuiCopy>;

export function getTuiCopy(locale: UiLocale): TuiCopy {
  return TUI_COPY[locale];
}
