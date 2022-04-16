import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [count, setCount] = useState(window.count || 0);

  function handleClick() {
    const result = count + 1;
    setCount(result);
    window.count = result;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{count}</h1>
        <button onClick={handleClick}>set count</button>
        {/* <img src={logo} className="App-logo" alt="logo" /> */}
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
