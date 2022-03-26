import React from "react";

import { Provider } from "react-redux";

import ReactDOM from "react-dom";
import App from "./App";
import { store } from "./store/store";
import { ThemeProvider } from "./theme/ThemeProvider";

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
      </ThemeProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
