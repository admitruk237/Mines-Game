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
    <div
      className={cn(
        'fixed inset-0 z-[100] flex items-center justify-center bg-bg-main/60 backdrop-blur-md animate-in fade-in duration-300',
        className
      )}
    >
      <div className="min-w-[160px] h-[96px] flex flex-col items-center justify-between">
        <div className="flex gap-3 mb-1">
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
