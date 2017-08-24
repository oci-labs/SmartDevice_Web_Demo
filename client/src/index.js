import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import store from "./store";
import "bootstrap/dist/css/bootstrap.css";
import "./css/App.css";
import "./css/grails.css";
import "./css/main.css";

function render() {
  ReactDOM.render(
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>,
    document.getElementById("root")
  );
}

render();
