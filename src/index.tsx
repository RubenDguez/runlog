import React from "react";

import { Provider } from "react-redux";

import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./app/store";
import { ThemeProvider } from "./theme/ThemeProvider";
import { SnackbarProvider } from "notistack";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
