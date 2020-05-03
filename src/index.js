import React from "react";

import { Route, Switch, HashRouter } from "react-router-dom";

import ReactDOM from "react-dom";

import App from "./App";
import Books from "./components/Books/Books";
import { createStore, applyMiddleware } from "redux";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";
import About from "./components/About/About";

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <div className="">
        <Switch>
          <Route exact path="/about">
            <About />
          </Route>
          <Route exact path="/books">
            <Books />
          </Route>
          <Route exact path="/home">
            <App />
          </Route>
          <Route exact path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </HashRouter>
  </Provider>,
  document.getElementById("root")
);

registerServiceWorker();
