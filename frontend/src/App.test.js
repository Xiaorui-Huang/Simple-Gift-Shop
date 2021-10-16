import { render, screen } from "@testing-library/react";
import App from "./App";
import { ThemeProvider } from "@mui/material/styles";
import theme from "./Checkout/theme";
import { combineReducers, createStore } from "redux";
import { Provider } from "react-redux";
import counterReducers from "./reducers/counter.js";

let store = createStore(
  combineReducers({ counter: counterReducers }),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

test("renders checkout app", () => {
  render(

  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>,
  );
  const linkElement = screen.getByText(/summary/i);
  expect(linkElement).toBeInTheDocument();
});
