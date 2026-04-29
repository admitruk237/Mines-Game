import type { HistoryItem as HistoryEntry } from '../model/types';
import { GAME_STATUS } from '@/entities/game/model/types';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { cn } from '@/shared/lib/utils';

interface Props {
  entry: HistoryEntry;
}

export const HistoryItem = ({ entry }: Props) => {
  const isWin = entry.status === GAME_STATUS.WON;
  const profit = entry.profit ?? 0;

  const formatAmount = (val: number | null | undefined) => (val ?? 0).toFixed(2);

  return (
    <div className="flex flex-col items-start self-stretch h-[73px] pt-[13px] pr-[13px] pb-[1px] pl-[13px] rounded-[10px] border border-history-border bg-history-bg shrink-0 gap-[8px] w-full">
      <div className="flex justify-between items-start w-full leading-[18px]">
        <span className="font-mono text-[12px] font-normal text-text-muted leading-[18px]">
          {formatCurrency(entry.betAmount)}
        </span>

        {isWin ? (
          <span className="font-mono text-[14px] font-bold text-text-win leading-[21px]">
            {entry.multiplier.toFixed(2)}x
          </span>
        ) : (
          <span className="text-[14px] leading-[14px] mt-[3px]">💣</span>
        )}
      </div>

      <div className="flex justify-between items-end w-full leading-[21px]">
        {isWin ? (
          <span className="font-mono text-[12px] font-normal text-text-muted leading-[18px] pb-[2px]">
            win
          </span>
        ) : (
          <span className="font-mono text-[12px] font-normal text-text-muted leading-[18px] pb-[2px]">
            BUST
          </span>
        )}

        <span
          className={cn(
            'font-mono text-[14px] font-bold leading-[21px]',
            isWin ? 'text-text-win' : 'text-text-loss'
          )}
        >
          {isWin ? '+' : '-'}
          {formatCurrency(isWin ? profit : entry.betAmount)}
        </span>
      </div>
    </div>
  );
};
