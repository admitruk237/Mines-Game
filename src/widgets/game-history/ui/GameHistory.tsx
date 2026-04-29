import { Card } from '@/shared/ui/card';
import { HistoryList } from '@/entities/history/ui/HistoryList';

export const GameHistory = () => {
  return (
    <Card
      variant="panel"
      className="flex flex-col w-[280px] h-full shrink-0 overflow-hidden border-none p-0"
    >
      <div className="flex flex-col h-full pt-[25px] pr-[25px] pb-[1px] pl-[25px] gap-4">
        <h3 className="font-sans text-[12px] font-bold text-white uppercase tracking-[0.6px] leading-[18px] shrink-0">
          Recent Games
        </h3>

        <div className="flex-1 min-h-0">
          <HistoryList />
        </div>
      </div>
    </Card>
  );
};
