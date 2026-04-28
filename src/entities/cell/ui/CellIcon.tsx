import GemIcon from '@/shared/assets/icons/gem.svg';
import MineIcon from '@/shared/assets/icons/mine.svg';
import { CellType } from '@/entities/game/model/types';
import { cn } from '@/shared/lib/utils';

const ICON_MAP = {
  [CellType.GEM]: GemIcon,
  [CellType.MINE]: MineIcon,
};

interface Props {
  type: CellType;
  className?: string;
}

export const CellIcon = ({ type, className }: Props) => {
  const IconPath = ICON_MAP[type];

  return <img src={IconPath} alt={type} className={cn('object-contain', className)} />;
};
