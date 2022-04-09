import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

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


function render(props) {
  const { container, publicPath } = props;
  // eslint-disable-next-line
  publicPath && (__webpack_public_path__ = publicPath);
  // container.innerHTML = '';
  console.log(container);
  ReactDOM.render(<App />, container || document.querySelector('#root'));
}

if (!window.__POWERED_BY_MICRO_TOY__) {
  render({});
}

export async function mount(props) {
  render(props);
  console.log('react app mounted');
}

export async function unmount(props) {
  const { container } = props;
  ReactDOM.unmountComponentAtNode(container || document.querySelector('#root'));
  console.log('react app unmount');
}

