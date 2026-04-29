import { Dialog, DialogContent } from '@/shared/ui/dialog';
import { cn } from '@/shared/lib/utils';
import type { ReactNode } from 'react';
import { Card } from '@/shared/ui/card';

interface Props {
  onReset: () => void;
  height: string;
  variant: 'win' | 'loss';
  children: ReactNode;
}

export const ResultModal = ({ onReset, height, variant, children }: Props) => {
  return (
    <Dialog open onOpenChange={(open) => !open && onReset()}>
      <DialogContent className="p-0 bg-transparent border-none shadow-none w-[384px] overflow-visible">
        <Card
          variant={variant}
          className={cn(
            'flex flex-col items-center py-[34px] justify-between rounded-[16px] w-full',
            height
          )}
        >
          {children}
        </Card>
      </DialogContent>
    </Dialog>
  );
};
