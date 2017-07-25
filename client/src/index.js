import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { Provider } from "react-redux";

import App from "./App";
import reducer from "./reducers";
import "./css/App.css";
import "./css/grails.css";
import "./css/main.css";

function render() {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById("root")
  );
}

const store = createStore(reducer, applyMiddleware(thunk));
store.subscribe(render);
render();
