import type { Game } from '@/entities/game';
import { StatRow } from '@/shared/ui';
import { cn, formatCurrency, mulCents } from '@/shared/lib';
import { TOTAL_CELLS } from '@/shared/config';
import { INFO_LABELS } from '../model/constants';

interface Props {
  game: Game;
}

export const InfoStats = ({ game }: Props) => {
  const gemsFound = game.gemsFound ?? 0;
  const currentProfit = mulCents(game.betAmount, game.currentMultiplier - 1);

  const mobileStats = [
    {
      label: INFO_LABELS.MULTIPLIER,
      value: `${game.currentMultiplier.toFixed(2)}x`,
      valueClass: 'text-text-win',
    },
    {
      label: INFO_LABELS.PROFIT,
      value: formatCurrency(currentProfit),
      valueClass: currentProfit > 0 ? 'text-text-win' : 'text-white',
    },
    {
      label: INFO_LABELS.GEMS,
      value: String(gemsFound),
      valueClass: 'text-white',
    },
  ];

  return (
    <div className="flex flex-col lg:gap-1 gap-4 w-full">
      {/* Mobile Grid Layout */}
      <div className="grid grid-cols-3 gap-2 lg:hidden">
        {mobileStats.map(({ label, value, valueClass }) => (
          <div key={label} className="flex flex-col items-center justify-center py-2 px-1">
            <span className="text-xs text-text-muted uppercase font-bold mb-1 tracking-tight">
              {label}
            </span>
            <span className={cn('text-base font-bold font-mono', valueClass)}>{value}</span>
          </div>
        ))}
      </div>

      {/* Desktop List Layout */}
      <div className="hidden lg:flex flex-col gap-1">
        <StatRow
          label={INFO_LABELS.MULTIPLIER}
          value={`${game.currentMultiplier.toFixed(2)}x`}
          tone="positive"
        />
        <StatRow
          label={INFO_LABELS.CURRENT_PROFIT}
          value={formatCurrency(currentProfit)}
          tone={currentProfit > 0 ? 'positive' : 'default'}
        />
        <StatRow
          label={INFO_LABELS.GEMS_FOUND}
          value={`${gemsFound} / ${TOTAL_CELLS - game.minesCount}`}
        />
        {game.nextMultiplier && (
          <StatRow
            label={INFO_LABELS.NEXT_MULTIPLIER}
            value={`${game.nextMultiplier.toFixed(2)}x`}
            className="opacity-60"
          />
        )}
      </div>
    </div>
  );
};
