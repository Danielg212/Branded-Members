import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'; // allows us to access the gloabl state / store
import { createStore, compose, applyMiddleware } from 'redux'; // used to create the state / store
import thunk from 'redux-thunk'; // used to create the state / store
import reducers from './reducers';
import App from './App';

// following is required to setup redux dev-tools with middleware
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducers, composeEnhancers(applyMiddleware(thunk)));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
