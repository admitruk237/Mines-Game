import { CELL_TYPE, type CellType } from '@/shared/config/game';

import { cn } from '@/shared/lib/utils';
import gemIcon from '@/shared/assets/icons/gem.png';
import mineIcon from '@/shared/assets/icons/mine.png';

const ICON_MAP = {
  [CELL_TYPE.GEM]: gemIcon,
  [CELL_TYPE.MINE]: mineIcon,
};

interface Props {
  type: CellType;
  className?: string;
}

export const CellIcon = ({ type, className }: Props) => {
  const IconPath = ICON_MAP[type];

  return <img src={IconPath} alt={type} className={cn('object-contain', className)} />;
};
