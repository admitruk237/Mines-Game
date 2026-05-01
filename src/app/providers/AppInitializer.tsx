import { type ReactNode } from 'react';
import { useRestoreSession } from '@/entities/game';
import { useMinimumLoading } from '@/shared/lib';
import { LoadingOverlay } from '@/shared/ui';
import { MIN_LOADER_DISPLAY_MS } from '@/shared/config';

interface Props {
  children: ReactNode;
}

export const AppInitializer = ({ children }: Props) => {
  const { isPending } = useRestoreSession();
  const showLoader = useMinimumLoading(isPending, MIN_LOADER_DISPLAY_MS);

  return (
    <>
      {showLoader && (
        <LoadingOverlay
          title="Starting Game..."
          className="md:w-96 w-64 h-32 md:h-40 rounded-[16px] bg-panel-bg border border-input-border"
        />
      )}
      {children}
    </>
  );
};
