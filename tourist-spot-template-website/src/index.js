import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { StateProvider } from './ContextAPI/StateProvider';
import reducer, { initialState } from './ContextAPI/reducer';

ReactDOM.render(
  <StateProvider initialState={initialState} reducer={reducer}>
    <App />
  </StateProvider>,
  document.getElementById('root')
);
