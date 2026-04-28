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
    default: 'text-slate-200',
    positive: 'text-green-400',
    negative: 'text-red-400',
  };

  return (
    <div
      className={cn(
        'flex justify-between items-center py-2 border-b border-slate-800/50 last:border-0',
        className
      )}
    >
      <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">{label}</span>
      <span className={cn('text-sm font-bold font-mono', toneClasses[tone])}>{value}</span>
    </div>
  );
};
