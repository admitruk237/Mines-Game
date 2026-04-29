import type { ReactNode } from 'react';
import { cn } from '@/shared/lib/utils';

interface Props {
  label: string;
  value: ReactNode;
  tone?: 'default' | 'positive' | 'negative';
  className?: string;
}

export const StatRow = ({ label, value, tone = 'default', className }: Props) => {
  const toneClasses = {
    default: 'text-white',
    positive: 'text-text-win',
    negative: 'text-text-loss',
  };

  return (
    <div className={cn('flex justify-between items-center py-2 ', className)}>
      <span className="text-xs font-medium text-text-muted uppercase tracking-wider">{label}</span>
      <span className={cn('text-sm font-bold font-mono', toneClasses[tone])}>{value}</span>
    </div>
  );
};
