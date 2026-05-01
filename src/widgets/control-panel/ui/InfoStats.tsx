import { type Game } from '@/entities/game';
import { StatRow } from '@/shared/ui';
import { cn, formatCurrency } from '@/shared/lib';
import { TOTAL_CELLS } from '@/shared/config';

interface Props {
  game: Game;
}

export const InfoStats = ({ game }: Props) => {
  const gemsFound = game.gemsFound ?? 0;
  const currentProfit = game.betAmount * (game.currentMultiplier - 1);

  return (
    <div className="flex flex-col lg:gap-1 gap-4 w-full">
      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-3 gap-2 lg:hidden">
        <div className="flex flex-col items-center justify-center py-2 px-1">
          <span className="text-xs text-text-muted uppercase font-bold mb-1 tracking-tight">
            Multiplier
          </span>
          <span className="text-md font-bold text-text-win font-mono">
            {game.currentMultiplier.toFixed(2)}x
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-2 px-1">
          <span className="text-xs text-text-muted uppercase font-bold mb-1 tracking-tight">
            Profit
          </span>
          <span
            className={cn(
              'text-md font-bold font-mono',
              currentProfit > 0 ? 'text-text-win' : 'text-white'
            )}
          >
            {formatCurrency(currentProfit)}
          </span>
        </div>

        <div className="flex flex-col items-center justify-center py-2 px-1">
          <span className="text-xs text-text-muted uppercase font-bold mb-1 tracking-tight">
            Gems
          </span>
          <span className="text-md font-bold text-white font-mono">{gemsFound}</span>
        </div>
      </div>

      {/* Desktop List Layout */}
      <div className="hidden lg:flex flex-col gap-1">
        <StatRow
          label="Multiplier"
          value={`${game.currentMultiplier.toFixed(2)}x`}
          tone="positive"
        />
        <StatRow
          label="Current Profit"
          value={formatCurrency(currentProfit)}
          tone={currentProfit > 0 ? 'positive' : 'default'}
        />
        <StatRow label="Gems Found" value={`${gemsFound} / ${TOTAL_CELLS - game.minesCount}`} />
        {game.nextMultiplier && (
          <StatRow
            label="Next Multiplier"
            value={`${game.nextMultiplier.toFixed(2)}x`}
            className="opacity-60"
          />
        )}
      </div>
    </div>
  );
};
