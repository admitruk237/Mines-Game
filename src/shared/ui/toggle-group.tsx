import React, { createContext, useContext } from 'react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import { toggleVariants } from '@/shared/ui/toggle';

const ToggleGroupContext = createContext<{
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  spacing?: number;
  orientation?: 'horizontal' | 'vertical';
}>({});

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 8,
  orientation = 'horizontal',
  children,
  ...props
}: BaseToggleGroup.Props &
  VariantProps<typeof toggleVariants> & {
    spacing?: number;
  }) {
  return (
    <BaseToggleGroup
      data-spacing={spacing}
      data-orientation={orientation}
      className={cn(
        'group/toggle-group flex w-full flex-row items-center transition-opacity duration-300',
        orientation === 'vertical' ? 'flex-col items-stretch' : 'flex-row',
        props.disabled && 'opacity-50 pointer-events-none cursor-not-allowed',
        className
      )}
      style={{ gap: `${spacing}px` } as React.CSSProperties}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </BaseToggleGroup>
  );
}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  ...props
}: BaseToggle.Props & VariantProps<typeof toggleVariants>) {
  const context = useContext(ToggleGroupContext);

  return (
    <BaseToggle
      className={cn(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        'rounded-[8px]',
        className
      )}
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
