import { useBalance } from '../api/queries';
import { CountUp } from '@/shared/ui/CountUp';
import { Skeleton } from '@/shared/ui/skeleton';
import { DollarSign, Wallet } from 'lucide-react';

interface Props {
  className?: string;
}

export const BalanceDisplay = ({ className }: Props) => {
  const { data, isLoading } = useBalance();
  const balance = data?.balance ?? 0;

  const balanceFormatter = (n: number) => n.toFixed(2);

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
      <div className="flex items-center">
        <span className="font-sans text-[12px] font-normal text-text-muted leading-[18px] mr-3">
          Balance
        </span>

        <div className="flex items-center">
          <Wallet className="w-[18px] h-[18px] text-text-muted" />
          <div className="ml-[15px] flex items-center">
            <div className="w-[18px] h-[18px] rounded-full bg-text-balance/10 flex items-center justify-center">
              <DollarSign className="w-[12px] h-[12px] text-text-balance" />
            </div>

            <CountUp
              value={balance}
              formatter={balanceFormatter}
              className="font-mono text-[16px] font-bold text-text-balance leading-[24px] ml-1.5"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
