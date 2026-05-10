import { Card, Dialog, DialogContent } from '@/shared/ui';
import { cn } from '@/shared/lib';
import type { ReactNode } from 'react';

interface Props {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  onReset: () => void;
  height?: string;
  variant: 'win' | 'loss' | 'info';
  children: ReactNode;
}

export const GameModal = ({
  open = true,
  onOpenChange,
  onReset,
  height,
  variant,
  children,
}: Props) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange || ((open) => !open && onReset())}>
      <DialogContent className="p-0 bg-transparent border-none shadow-none w-[92vw] max-w-[384px] overflow-visible">
        <Card
          variant={variant}
          className={cn(
            'flex flex-col items-center py-6 lg:py-[34px] px-6 justify-between rounded-[16px] w-full min-h-[300px]',
            height
          )}
        >
          {children}
        </Card>
      </DialogContent>
    </Dialog>
  );
};
