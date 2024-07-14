import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import store from "./store";
import { Provider } from "react-redux";
import "primereact/resources/themes/viva-light/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
