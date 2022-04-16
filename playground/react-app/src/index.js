import React from 'react';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { createRoot } from 'react-dom/client';

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

let root;

function render(props) {
  const { container, publicPath } = props;
  // eslint-disable-next-line
  publicPath && (__webpack_public_path__ = publicPath);
  root = createRoot(container || document.querySelector('#root'));
  root.render(<App />);
}

if (!window.__POWERED_BY_MICRO_TOY__) {
  render({});
}

export async function mount(props) {
  render(props);
  console.log('react app mounted');
}

export async function unmount() {
  root.unmount();
  console.log('react app unmount');
}

