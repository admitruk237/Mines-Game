import { createContext, type CSSProperties, useContext } from 'react';
import { Toggle as BaseToggle } from '@base-ui/react/toggle';
import { ToggleGroup as BaseToggleGroup } from '@base-ui/react/toggle-group';
import { type VariantProps } from 'class-variance-authority';

import { cn } from '@/shared/lib/utils';
import { toggleVariants } from '@/shared/ui/toggle';
import { useSoundContext } from '@/shared/lib/contexts/SoundContext';
import { SOUND_KEYS } from '@/shared/lib/constants/sounds';

interface ToggleGroupContextValue {
  variant?: VariantProps<typeof toggleVariants>['variant'];
  size?: VariantProps<typeof toggleVariants>['size'];
  spacing?: number;
  orientation?: 'horizontal' | 'vertical';
}

const ToggleGroupContext = createContext<ToggleGroupContextValue>({});

interface ToggleGroupProps extends BaseToggleGroup.Props, VariantProps<typeof toggleVariants> {
  spacing?: number;
}

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 8,
  orientation = 'horizontal',
  children,
  ...props
}: ToggleGroupProps) {
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
      style={{ gap: `${spacing}px` } as CSSProperties}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size, spacing, orientation }}>
        {children}
      </ToggleGroupContext.Provider>
    </BaseToggleGroup>
  );
}

interface ToggleGroupItemProps extends BaseToggle.Props, VariantProps<typeof toggleVariants> {}

function ToggleGroupItem({
  className,
  children,
  variant = 'default',
  size = 'default',
  onClick,
  ...props
}: ToggleGroupItemProps) {
  const context = useContext(ToggleGroupContext);
  const soundContext = useSoundContext();

  const handleClick = (e: Parameters<NonNullable<BaseToggle.Props['onClick']>>[0]) => {
    soundContext?.playSound(SOUND_KEYS.CLICK);
    onClick?.(e);
  };

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
      onClick={handleClick}
      {...props}
    >
      {children}
    </BaseToggle>
  );
}

export { ToggleGroup, ToggleGroupItem };
