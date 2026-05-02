import { memo } from 'react';
import { Card } from '@/shared/ui/card';
import { HistoryList } from '@/entities/history';

export const GameHistory = memo(() => {
  return (
    <Card
      variant="panel"
      className="flex flex-col w-full lg:w-[280px] lg:h-full shrink-0 overflow-hidden border-none p-4 lg:p-6 bg-panel-bg"
    >
      <div className="flex flex-col h-full pt-2  gap-2 lg:gap-4">
        <h3 className="font-sans text-[10px] lg:text-[12px] font-bold text-white uppercase tracking-[0.6px] leading-[18px] shrink-0 opacity-50 lg:opacity-100">
          Recent Games
        </h3>

        <div className="flex-1 min-h-0 overflow-x-auto lg:overflow-x-hidden">
          <HistoryList />
        </div>
      </div>
    </Card>
  );
});

GameHistory.displayName = 'GameHistory';
