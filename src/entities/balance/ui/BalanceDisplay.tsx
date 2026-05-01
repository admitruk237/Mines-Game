import { useCallback, useEffect } from 'react';
import { useBalance } from '../api/queries';
import { CountUp, Skeleton } from '@/shared/ui';
import { incrementPlayerId } from '@/shared/lib/playerId';

interface Props {
  className?: string;
}

export const BalanceDisplay = ({ className }: Props) => {
  const { data, isLoading } = useBalance();
  const balance = data?.balance ?? 0;

  useEffect(() => {
    if (!isLoading && balance <= 0) {
      const timer = setTimeout(() => {
        incrementPlayerId();
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [balance, isLoading]);

  const balanceFormatter = useCallback((n: number) => n.toFixed(2), []);

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <span className="font-sans text-[12px] font-normal text-text-muted leading-[18px]">
          Balance
        </span>
        <Skeleton className="h-6 w-32 bg-skeleton-bg rounded-md" />
      </div>
    );
  }

  return (
    <div
      className={className}
      aria-live="polite"
      aria-label={`Current balance: ${balance.toFixed(2)}`}
    >
      <div className="flex items-center justify-between">
        <span className="font-sans text-[12px] font-normal text-text-muted leading-[18px] mr-3">
          Balance
        </span>
        <div>
          <span className="font-mono text-sm md:text-base font-bold text-text-balance leading-[24px] mr-1">
            💰
          </span>
          <CountUp
            end={balance}
            formattingFn={balanceFormatter}
            className="font-mono text-sm md:text-base  font-bold text-text-balance leading-[24px]"
          />
        </div>
      </div>
    </div>
  );
};
