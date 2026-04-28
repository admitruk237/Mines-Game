import { toast } from 'sonner';

export const handleApiError = (err: unknown) => {
  // RULE: Do not use local `onError` callbacks in useQuery/useMutation to show toasts.
  // Global QueryCache/MutationCache will trigger alongside local callbacks, causing double toasts.
  //
  // TODO (MVP+): Add a "Retry" button for connection errors (status === 0).
  // Note: While retrying queries (GET) is simple via queryClient.invalidateQueries(),
  // retrying mutations (POST) requires storing the last mutation state.
  // For now, we just show the message returned by our apiFetch.

  if (import.meta.env.DEV) {
    console.error('[API Error]', err);
  }

  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error('An unexpected error occurred');
  }
};
