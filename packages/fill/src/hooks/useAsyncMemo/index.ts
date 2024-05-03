import { useEffect, useState } from 'react';

export const useAsyncMemo = <T>(fn: () => Promise<T>, arr: Array<any>) => {
  const [value, setValue] = useState<T>();
  useEffect(() => {
    Promise.resolve(fn()).then((res: any) => {
      setValue(res);
    });
  }, [arr, fn]);
  return value;
};
