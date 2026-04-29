import { Toggle as TogglePrimitive } from '@base-ui/react/toggle';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';

const toggleVariants = cva(
  "inline-flex shrink-0 items-center justify-center rounded-lg border border-transparent bg-clip-padding text-sm font-medium transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 active:not-aria-[haspopup]:translate-y-px disabled:pointer-events-none disabled:opacity-50 cursor-pointer [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:text-secondary-foreground aria-pressed:bg-primary aria-pressed:text-primary-foreground',
        outline:
          'border-border bg-background hover:bg-muted hover:text-foreground aria-pressed:bg-muted aria-pressed:text-foreground dark:border-input dark:bg-input/30 dark:hover:bg-input/50',
        'secondary-dark':
          'bg-bet-action-bg text-bet-action-text border-transparent hover:bg-bet-action-bg/80 hover:text-white transition-colors aria-pressed:bg-active-blue aria-pressed:text-white',
      },
      size: {
        default:
          'h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        sm: "h-7 min-w-7 rounded-[min(var(--radius-md),12px)] px-2.5 text-[0.8rem] has-data-[icon=inline-end]:pr-1.5 has-data-[icon=inline-start]:pl-1.5 [&_svg:not([class*='size-'])]:size-3.5",
        lg: 'h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pr-2 has-data-[icon=inline-start]:pl-2',
        bet: 'h-[39px] flex-1 rounded-[8px] text-[12px] font-bold px-0',
        mines:
          'h-[45px] min-w-[39.6px] rounded-[10px] text-[14px] leading-[21px] tracking-[-0.15px] font-bold',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

function Toggle({
  className,
  variant,
  size,
  ...props
}: TogglePrimitive.Props & VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Toggle, toggleVariants };
