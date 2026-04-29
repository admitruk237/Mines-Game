import { useCountUp } from 'react-countup';
import { useRef } from 'react';

interface Props {
  value: number;
  durationMs?: number;
  formatter?: (n: number) => string;
  className?: string;
}

export const CountUp = ({ value, durationMs = 500, formatter, className }: Props) => {
  const countUpRef = useRef<HTMLSpanElement>(null!);

  useCountUp({
    ref: countUpRef,
    start: 0,
    end: value,
    duration: durationMs / 1000,
    formattingFn: formatter,
    enableReinitialize: true,
  });

  return <span ref={countUpRef} className={className} />;
};
