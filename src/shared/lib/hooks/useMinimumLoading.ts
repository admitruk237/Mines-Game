import { useEffect, useState } from 'react';

export const useMinimumLoading = (isPending: boolean, minTime: number = 800) => {
  const [show, setShow] = useState(isPending);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (isPending) {
      timer = setTimeout(() => setShow(true), 0);
    } else {
      timer = setTimeout(() => {
        setShow(false);
      }, minTime);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPending, minTime]);

  return isPending || show;
};
