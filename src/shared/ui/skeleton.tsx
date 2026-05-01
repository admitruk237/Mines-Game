import type { DivProps } from './types';
import { cn } from '@/shared/lib/utils';

function Skeleton({ className, ...props }: DivProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn('animate-pulse rounded-md bg-muted', className)}
      {...props}
    />
  );
}

export { Skeleton };
