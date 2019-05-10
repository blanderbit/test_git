import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from "react-router-dom";
// import { browserHistory } from "react-router";


import { Provider } from "react-redux";
import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";

import './index.scss';
import App from './App';
import * as serviceWorker from './serviceWorker';
import authReducer from "./redux/reducers/auth";
import roomReducer from "./redux/reducers/halls";
import ticketsReducer from "./redux/reducers/tickets";
import commonReducer from "./redux/reducers/common";


const rootReducer = combineReducers({
  auth: authReducer,
  halls: roomReducer,
  tickets: ticketsReducer,
  common: commonReducer
});

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(app, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
