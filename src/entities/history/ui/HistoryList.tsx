import { useGameHistory } from '../api/queries';
import { HistoryItem } from './HistoryItem';
import { Skeleton } from '@/shared/ui/skeleton';

export const HistoryList = () => {
  const { data, isLoading } = useGameHistory();
  const history = data?.games ?? [];

  const renderContent = () => {
    if (isLoading) {
      return Array.from({ length: 10 }).map((_, i) => (
        <Skeleton
          key={i}
          className="h-[73px] w-[224px] bg-skeleton-bg/50 rounded-[10px] shrink-0"
        />
      ));
    }

    if (history.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
          <span className="text-xs font-medium text-text-muted">No games yet</span>
        </div>
      );
    }

    return history.map((entry) => <HistoryItem key={entry.gameId} entry={entry} />);
  };

  return (
    <div className="flex flex-col gap-2 w-full h-full overflow-y-auto scrollbar-hide pb-10">
      {renderContent()}
    </div>
  );
};
