import { useEffect, useState } from 'react';

export const useMinimumLoading = (isPending: boolean, minTime: number) => {
  const [show, setShow] = useState(false);
  const [prevIsPending, setPrevIsPending] = useState(isPending);

  if (isPending !== prevIsPending) {
    setPrevIsPending(isPending);
    if (isPending) {
      setShow(true);
    }
  }

  useEffect(() => {
    if (isPending) return;

    const timer = setTimeout(() => {
      setShow(false);
    }, minTime);

    return () => clearTimeout(timer);
  }, [isPending, minTime]);

  return show;
};
