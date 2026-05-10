import type { HistoryItem as HistoryEntry } from '../model/types';
import { GAME_STATUS } from '@/entities/game';
import { cn, formatCurrency } from '@/shared/lib';

interface Props {
  entry: HistoryEntry;
}

export const HistoryItem = ({ entry }: Props) => {
  const isWin = entry.status === GAME_STATUS.WON;
  const profit = entry.profit ?? 0;

  return (
    <div className="flex flex-col items-start self-stretch md:p-3 p-2 rounded-[10px] border border-history-border bg-history-bg shrink-0 gap-[8px] w-32 h-[61px] md:h-[72px] md:w-[224px] lg:w-full lg:h-[72px]">
      <div className="flex justify-between items-start w-full leading-[18px]">
        <span className="font-mono text-[12px] font-normal text-text-muted leading-[18px]">
          {formatCurrency(entry.betAmount)}
        </span>

        {isWin ? (
          <span className="font-mono md:text-sm text-xs font-bold text-text-win leading-[21px]">
            {entry.multiplier.toFixed(2)}x
          </span>
        ) : (
          <span className="md:text-sm text-xs leading-[14px] mt-[3px]">💣</span>
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
            'font-mono md:text-sm text-xs font-bold leading-[21px]',
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
