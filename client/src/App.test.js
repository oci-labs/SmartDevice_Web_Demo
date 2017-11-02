import {afterEach, beforeEach} from 'jest';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import sinon from 'sinon';
import {createStore, applyMiddleware, compose} from 'redux';
import reducer from './redux-modules';

const composeEnhancers =
  typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;
const enhancer = composeEnhancers(applyMiddleware(thunk));
const store = createStore(reducer, enhancer);

beforeEach(() => {
  sinon.stub(window, 'fetch');

  const res = new window.Response('{"id":"1"}', {
    status: 200,
    headers: {
      'Content-type': 'application/json'
    }
  });

  window.fetch.returns(Promise.resolve(res));
});

afterEach(() => {
  window.fetch.restore();
});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  );
});
