import type { Game } from '@/entities/game/model/types';
import { StatRow } from '@/shared/ui/StatRow';
import { formatCurrency } from '@/shared/lib/formatCurrency';
import { TOTAL_CELLS } from '@/shared/config/game';

interface Props {
  game: Game;
}

export const InfoStats = ({ game }: Props) => {
  const gemsFound = game.gemsFound ?? 0;
  const currentProfit = game.betAmount * (game.currentMultiplier - 1);

  return (
    <div className="flex flex-col gap-1 w-full">
      <StatRow label="Multiplier" value={`${game.currentMultiplier.toFixed(2)}x`} tone="positive" />
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
  );
};
