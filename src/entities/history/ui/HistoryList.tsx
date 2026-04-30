import { useGameHistory } from '../api/queries';
import { HistoryItem } from './HistoryItem';
import { Skeleton } from '@/shared/ui/skeleton';

export const HistoryList = () => {
  const { data, isLoading, isError } = useGameHistory();
  const history = data?.games ?? [];

  if (isLoading) {
    return Array.from({ length: 10 }).map((_, i) => (
      <Skeleton key={i} className="h-[73px] w-[224px] bg-skeleton-bg/50 rounded-[10px] shrink-0" />
    ));
  }

  if (history.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
        <span className="text-xs font-medium text-text-muted">No games yet</span>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-10 text-center opacity-40">
        <span className="text-xs font-medium text-text-loss">Failed to load history</span>
      </div>
    );
  }

  return (
    <div className="flex lg:flex-col flex-row gap-2 w-full h-full overflow-y-hidden lg:overflow-y-auto overflow-x-auto lg:overflow-x-hidden scrollbar-hide pb-4 lg:pb-10">
      {history.map((entry) => (
        <HistoryItem key={entry.gameId} entry={entry} />
      ))}
    </div>
  );
};
