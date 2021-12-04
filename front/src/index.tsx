import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import { createStore } from "./reducks/store/store";
import { ConnectedRouter } from "connected-react-router";
import { MuiThemeProvider } from "@material-ui/core";
import { theme } from "./assets/theme";
import * as History from "history";

const history = History.createBrowserHistory();
export const store = createStore(history);

ReactDOM.render(
  <Provider store={store}>
    <ConnectedRouter history={history}>
      <MuiThemeProvider theme={theme}>
        <App />
      </MuiThemeProvider>
    </ConnectedRouter>
  </Provider>,
  document.getElementById("root")
);
