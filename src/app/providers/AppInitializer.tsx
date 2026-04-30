import { type ReactNode } from 'react';
import { useRestoreSession } from '@/entities/game/model/useRestoreSession';
import { useMinimumLoading } from '@/shared/lib/hooks/useMinimumLoading';
import { LoadingOverlay } from '@/shared/ui/LoadingOverlay';
import { MIN_LOADER_DISPLAY_MS } from '@/shared/config/animations';

interface Props {
  children: ReactNode;
}

export const AppInitializer = ({ children }: Props) => {
  const { isPending } = useRestoreSession();
  const showLoader = useMinimumLoading(isPending, MIN_LOADER_DISPLAY_MS);

  return (
    <>
      {showLoader && <LoadingOverlay title="Starting Game..." subtitle="Loading game..." />}
      {children}
    </>
  );
};
