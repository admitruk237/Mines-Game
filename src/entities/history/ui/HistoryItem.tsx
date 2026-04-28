import type { HistoryItem as HistoryEntry } from '../model/types';
import { GameStatus } from '@/entities/game/model/types';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { cn } from '@/shared/lib/utils';
import { Bomb } from 'lucide-react';

interface Props {
  entry: HistoryEntry;
}

export const HistoryItem = ({ entry }: Props) => {
  const isWin = entry.status === GameStatus.WON;
  const profit = entry.profit;

  return (
    <div className="flex flex-col justify-between w-[224px] h-[73px] pt-[13px] pr-[13px] pb-[1px] pl-[13px] rounded-[10px] border border-history-border bg-history-bg shrink-0 gap-2">
      <div className="flex justify-between items-start leading-[18px]">
        <span className="font-mono text-[12px] font-normal text-text-muted">
          {formatCurrency(entry.betAmount)}
        </span>

        {isWin ? (
          <span className="font-mono text-[14px] font-bold text-text-win leading-[21px]">
            {entry.multiplier.toFixed(2)}x
          </span>
        ) : (
          <Bomb className="w-[14px] h-[14px] text-text-loss mt-[3px]" />
        )}
      </div>

      <div className="flex justify-between items-end leading-[21px]">
        <span
          className={cn(
            'font-mono text-[14px] font-bold leading-[21px]',
            isWin ? 'text-text-win' : 'text-text-muted'
          )}
        >
          {isWin && '+'}
          {formatCurrency(profit)}
        </span>

        <span className="font-mono text-[12px] font-normal text-text-muted leading-[18px] pb-[2px]">
          {isWin ? 'win' : 'loss'}
        </span>
      </div>
    </div>
  );
};
