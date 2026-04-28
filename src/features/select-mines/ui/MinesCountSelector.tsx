import { useShallow } from 'zustand/react/shallow';
import { useMinesStore } from '../model/useMinesStore';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui/toggle-group';
import { MINES_OPTIONS } from '@/shared/config/game';

export const MinesCountSelector = () => {
  const { minesCount, setMinesCount } = useMinesStore(
    useShallow((s) => ({
      minesCount: s.minesCount,
      setMinesCount: s.setMinesCount,
    }))
  );

  const handleValueChange = (values: string[]) => {
    if (values.length > 0) {
      const newValue = values[values.length - 1];
      setMinesCount(parseInt(newValue, 10));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[11px] font-bold uppercase text-slate-500 tracking-wider ml-1">
        Mines
      </span>
      <ToggleGroup
        value={[minesCount.toString()]}
        onValueChange={handleValueChange}
        className="grid grid-cols-4 gap-2"
      >
        {MINES_OPTIONS.map((option) => (
          <ToggleGroupItem
            key={option}
            value={option.toString()}
            variant="secondary-dark"
            size="mines"
            className="w-full"
          >
            {option}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
