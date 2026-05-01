import { type ComponentProps } from 'react';
import { Input as InputPrimitive } from '@base-ui/react/input';
import { cn } from '@/shared/lib/utils';

function Input({ className, type, ...props }: ComponentProps<'input'>) {
  return (
    <InputPrimitive
      type={type}
      data-slot="input"
      className={cn(
        'flex w-full min-w-0 transition-all outline-none',
        'h-[46px] rounded-[10px] border border-input-border bg-input-bg items-center',
        'px-4',
        'text-white text-base md:text-sm font-medium',
        'placeholder:text-white/50',

        'focus-visible:border-emerald-500/50 focus-visible:ring-2 focus-visible:ring-emerald-500/10',
        'disabled:pointer-events-none disabled:opacity-50',
        'aria-invalid:border-red-500 aria-invalid:ring-2 aria-invalid:ring-red-500/10',

        className
      )}
      {...props}
    />
  );
}

export { Input };
