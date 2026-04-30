import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { CellState } from '../model/types';
import { CELL_TYPE } from '@/entities/game/model/types';
import { CellIcon } from './CellIcon';
import { cn } from '@/shared/lib/utils';
import { useSoundContext } from '@/shared/lib/contexts/SoundContext';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';
import type { ReactNode } from 'react';

const cellVariants = cva(
  'aspect-square flex items-center justify-center rounded-[14px] transition-all select-none w-full border border-solid duration-75',
  {
    variants: {
      state: {
        [CellState.HIDDEN]:
          'bg-cell-bg border-cell-border hover:bg-cell-border cursor-pointer active:translate-y-0.5',
        [CellState.GEM]: 'bg-cell-gem-bg border-cell-gem-border',
        [CellState.MINE]: 'bg-cell-mine-bg border-cell-mine-border opacity-40',
        [CellState.MINE_HIT]:
          'bg-cell-mine-bg border-text-loss animate-in zoom-in duration-300 ring-2 ring-lose-glow',
        [CellState.INACTIVE]:
          'bg-cell-bg/40 border-cell-border/40 cursor-not-allowed grayscale opacity-50',
        [CellState.LOADING]: 'bg-cell-bg border-cell-border animate-pulse cursor-wait',
      },
    },
  }
);

const ICON_BY_STATE: Partial<Record<CellState, ReactNode>> = {
  [CellState.GEM]: <CellIcon type={CELL_TYPE.GEM} className="w-7 h-7" />,
  [CellState.MINE]: <CellIcon type={CELL_TYPE.MINE} className="w-7 h-7" />,
  [CellState.MINE_HIT]: <CellIcon type={CELL_TYPE.MINE} className="w-7 h-7 text-white" />,
  [CellState.LOADING]: <Loader2 className="w-7 h-7 animate-spin text-text-muted" />,
};

const CLICKABLE_STATES: CellState[] = [CellState.HIDDEN];

interface Props {
  state: CellState;
  onClick?: () => void;
  ariaLabel: string;
}

export const Cell = ({ state, onClick, ariaLabel }: Props) => {
  const isClickable = CLICKABLE_STATES.includes(state);
  const { playSound } = useSoundContext();

  const handleClick = () => {
    if (isClickable) {
      playSound(SOUND_KEYS.CLICK);
      onClick?.();
    }
  };

  return (
    <button
      type="button"
      disabled={!isClickable}
      onClick={handleClick}
      aria-label={ariaLabel}
      className={cn(cellVariants({ state }))}
    >
      {ICON_BY_STATE[state] ?? null}
    </button>
  );
};
