import { cn } from '@/shared/lib/utils';

interface Props {
  title?: string;
  subtitle?: string;
  className?: string;
}

export const LoadingOverlay = ({
  title = 'Mines',
  subtitle = 'Loading game...',
  className,
}: Props) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-bg-main/80 backdrop-blur-xl animate-in fade-in duration-300">
      <div className={cn('flex flex-col items-center justify-center p-6', className)}>
        <div className="flex gap-3 mb-4">
          <div className="w-4 h-4 rounded-full bg-active-blue animate-dot-wave" />
          <div className="w-4 h-4 rounded-full bg-text-win animate-dot-wave [animation-delay:200ms]" />
          <div className="w-4 h-4 rounded-full bg-text-balance animate-dot-wave [animation-delay:400ms]" />
        </div>

        <div className="flex flex-col items-center gap-1">
          <h2 className="text-white text-center font-sans text-[20px] font-bold leading-[30px] tracking-[0.551px] uppercase whitespace-nowrap">
            {title}
          </h2>
          <p className="text-text-muted text-center font-sans text-[12px] font-normal leading-[18px]">
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
};
