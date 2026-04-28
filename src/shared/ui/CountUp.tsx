import ReactCountUp from 'react-countup';

interface Props {
  value: number;
  durationMs?: number;
  formatter?: (n: number) => string;
  className?: string;
}

export const CountUp = ({ value, durationMs = 500, formatter, className }: Props) => {
  return (
    <ReactCountUp
      end={value}
      duration={durationMs / 1000}
      formattingFn={formatter}
      className={className}
      preserveValue
    />
  );
};
