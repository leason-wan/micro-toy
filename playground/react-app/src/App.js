import logo from './logo.svg';
import './App.css';
import {useState} from 'react';

function App() {
  const [count, setCount] = useState(window.count || 0);

  function increment() {
    setCount(count + 1);
    window.count = count + 1;
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>{count}</h1>
        <button onClick={increment}>count set</button>
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
