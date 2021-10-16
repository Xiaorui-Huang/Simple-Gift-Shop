import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Checkout/theme";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import cartReducer from "./reducers/counter.js";
import { enableMapSet } from "immer";

enableMapSet();

let store = createStore(
  combineReducers({ cart: cartReducer }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);
