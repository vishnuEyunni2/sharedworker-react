let cookie = '';
// eslint-disable-next-line no-restricted-globals
self.onconnect = (e) => {

  const port = e.ports[0];
  port.onmessage = (e) => {
    // const workerResult = `Result: ${e.data[0] * e.data[1]}`;
    if (e.data.type === 'set') {
      cookie = e.data.newValue;
      console.log('#G', { old: e.data.oldValue, new: e.data.newValue });
      port.postMessage({ type: 'get', value: cookie });
      return;
    }

    if (e.data.type === 'get') {
      console.log('#R', cookie);
      port.postMessage({ type: 'get', value: cookie })
      return;
    }
  };
}