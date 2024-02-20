import { useEffect, useMemo, useState } from "react";

const useWorker = (url, name = '[hash') => {

  const worker = useMemo(() => new SharedWorker(url, { type: 'module', name }, 2), [name, url]);
  const [value, setValue] = useState('');

  useEffect(() => {
    worker.port.onmessage = (e) => {
      if (e.data.type === 'get') {
        setValue(e.data.value);
      }
    }
  }, [worker]);

  const setData = (val) => {
    worker.port.postMessage({ oldValue: value, newValue: val, type: 'set' });
  }

  const getData = () => {
    worker.port.postMessage({ type: 'get' });
  }

  return [value, setData, getData];
}

export default useWorker;