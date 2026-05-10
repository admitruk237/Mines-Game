import { useMinesState } from '../model/useMinesStore';
import { ToggleGroup, ToggleGroupItem } from '@/shared/ui';
import { TOTAL_CELLS } from '@/shared/config';

const MINES_OPTIONS = [1, 3, 5, 10, TOTAL_CELLS - 1];

interface Props {
  disabled?: boolean;
}

export const MinesCountSelector = ({ disabled }: Props) => {
  const { minesCount, setMinesCount } = useMinesState();

  const handleValueChange = (values: string[]) => {
    const firstValue = values[0];
    if (firstValue !== undefined) {
      setMinesCount(parseInt(firstValue, 10));
    }
  };

  return (
    <div className="flex flex-col gap-2 w-full">
      <span className="text-[12px] uppercase text-text-muted tracking-wider">Mines</span>
      <ToggleGroup
        value={[minesCount.toString()]}
        onValueChange={handleValueChange}
        variant="secondary-dark"
        size="bet"
        spacing={6}
        disabled={disabled}
        className="w-full"
      >
        {MINES_OPTIONS.map((count) => (
          <ToggleGroupItem key={count} value={count.toString()}>
            {count}
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    </div>
  );
};
