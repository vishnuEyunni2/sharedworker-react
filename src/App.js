import './App.css';
import useWorker from './useWorker';

function App() {

  const [value, setData, getData] = useWorker(new URL('./workers/shared.worker.js', import.meta.url), 'test-sw');

  function setValue(e) {
    const el = document.getElementById('input');
    setData(el.value);
  }

  return (
    <div className="App">
      <section>
        <label htmlFor="input">value set is: {value} </label>
        <br />
        <input type="text" id='input' placeholder='Enter value' />
        <button onClick={(e) => setValue(e)}>Set Random Value</button>
        <button onClick={(e) => getData()}>Get Value</button>
      </section>
    </div>
  );
}

export default App;
