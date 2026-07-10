import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  label: string;
  value: ReactNode;
  tone?: 'default' | 'positive' | 'negative';
  className?: string;
}

const TONE_CLASSES = {
  default: 'text-white',
  positive: 'text-text-win',
  negative: 'text-text-loss',
} as const;

export const StatRow = ({ label, value, tone = 'default', className }: Props) => {
  return (
    <div className={cn('flex justify-between items-center py-2', className)}>
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</span>
      <span className={cn('text-sm font-bold font-mono', TONE_CLASSES[tone])}>{value}</span>
    </div>
  );
};
