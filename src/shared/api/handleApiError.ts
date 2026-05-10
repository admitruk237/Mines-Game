import { toast } from 'sonner';

export const handleApiError = (err: unknown) => {
  if (import.meta.env.DEV) {
    console.error('[API Error]', err);
  }

  if (err instanceof Error) {
    toast.error(err.message);
  } else {
    toast.error('An unexpected error occurred');
  }
};
