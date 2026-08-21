import { useEffect, useState } from 'react';
import { formatAbsoluteTimestamp } from './chat-display-helpers.js';
import {
  formatCompactTimestamp,
  formatRelativeTimestamp,
  nextRelativeRefreshDelay,
} from '@maka/core/relative-time';
import { cn } from './utils.js';
import { useUiLocale } from './locale-context.js';

/**
 * Self-refreshing relative-time label: stays on the just-now label for the
 * first minute, then ticks every minute, then every 10 minutes (see
 * `nextRelativeRefreshDelay`), stopping past the 7-day horizon to show the
 * absolute date. `variant="compact"` uses the date-only fallback
 * (`formatCompactTimestamp`) that fits space-starved sidebar rows.
 */
export function RelativeTime(props: {
  ts: number;
  className?: string;
  suppressTitle?: boolean;
  variant?: 'relative' | 'compact';
}) {
  const locale = useUiLocale();
  const [, setTick] = useState(0);
  useEffect(() => {
    const delay = nextRelativeRefreshDelay(props.ts);
    if (delay === null) return;
    const id = setTimeout(() => setTick((n) => n + 1), delay);
    return () => clearTimeout(id);
  });
  const format = props.variant === 'compact' ? formatCompactTimestamp : formatRelativeTimestamp;
  return (
    <small
      className={cn('tabular-nums', props.className ?? 'maka-message-time')}
      aria-hidden="true"
      title={props.suppressTitle ? undefined : formatAbsoluteTimestamp(props.ts, locale)}
    >
      {format(props.ts, Date.now(), locale)}
    </small>
  );
}
