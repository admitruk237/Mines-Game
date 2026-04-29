import { cn } from '@/shared/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const CARD_VARIANTS = cva(
  'group/card flex flex-col overflow-hidden rounded-xl bg-card text-card-foreground transition-all duration-300',
  {
    variants: {
      variant: {
        default: 'bg-card text-card-foreground ring-1 ring-foreground/10',
        panel: 'bg-panel-bg border border-history-border p-[25px] rounded-[14px]',
        win: 'bg-panel-bg border-2 border-text-win shadow-[0_0_50px_0_var(--color-win-glow)]',
        loss: 'bg-panel-bg border-2 border-text-loss shadow-[0_0_50px_0_var(--color-lose-glow)]',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

interface CardProps extends React.ComponentProps<'div'>, VariantProps<typeof CARD_VARIANTS> {}

function Card({ className, variant, ...props }: CardProps) {
  return <div data-slot="card" className={cn(CARD_VARIANTS({ variant }), className)} {...props} />;
}

function CardHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-header"
      className={cn('flex flex-col space-y-1.5 p-6', className)}
      {...props}
    />
  );
}

function CardTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-title"
      className={cn('font-semibold leading-none tracking-tight', className)}
      {...props}
    />
  );
}

function CardDescription({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-description"
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
}

function CardContent({ className, ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="card-content" className={cn('p-6 pt-0', className)} {...props} />;
}

function CardFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="card-footer"
      className={cn('flex items-center p-6 pt-0', className)}
      {...props}
    />
  );
}

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
