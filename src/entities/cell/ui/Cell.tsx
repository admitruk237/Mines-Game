import { ReactNode } from 'react';
import { cva } from 'class-variance-authority';
import { Loader2 } from 'lucide-react';
import { CellState } from '../model/types';
import { CellType } from '@/entities/game/model/types';
import { CellIcon } from './CellIcon';
import { cn } from '@/shared/lib/utils';

const cellVariants = cva(
  'aspect-square flex items-center justify-center rounded-[14px] transition-all select-none w-full border border-solid duration-75',
  {
    variants: {
      state: {
        [CellState.HIDDEN]:   'bg-cell-bg border-cell-border hover:bg-cell-border cursor-pointer active:translate-y-0.5',
        [CellState.GEM]:      'bg-cell-gem-bg border-cell-gem-border',
        [CellState.MINE]:     'bg-cell-mine-bg border-cell-mine-border opacity-40',
        [CellState.MINE_HIT]: 'bg-cell-mine-bg border-red-500 animate-in zoom-in duration-300 ring-2 ring-red-500/50',
        [CellState.INACTIVE]: 'bg-cell-bg/40 border-cell-border/40 cursor-not-allowed grayscale opacity-50',
        [CellState.LOADING]:  'bg-cell-bg border-cell-border animate-pulse cursor-wait',
      },
    },
  }
);

const ICON_BY_STATE: Partial<Record<CellState, ReactNode>> = {
  [CellState.GEM]:      <CellIcon type={CellType.GEM} className="w-7 h-7" />,
  [CellState.MINE]:     <CellIcon type={CellType.MINE} className="w-7 h-7" />,
  [CellState.MINE_HIT]: <CellIcon type={CellType.MINE} className="w-7 h-7 text-white" />,
  [CellState.LOADING]:  <Loader2 className="w-7 h-7 animate-spin text-slate-500" />,
};

interface Props {
  state: CellState;
  onClick?: () => void;
  ariaLabel: string;
}

const CLICKABLE_STATES: CellState[] = [CellState.HIDDEN];

export const Cell = ({ state, onClick, ariaLabel }: Props) => {
  const isClickable = CLICKABLE_STATES.includes(state);
  
  return (
    <button
      type="button"
      disabled={!isClickable}
      onClick={onClick}
      aria-label={ariaLabel}
      className={cn(cellVariants({ state }))}
    >
      {ICON_BY_STATE[state] ?? null}
    </button>
  );
};
