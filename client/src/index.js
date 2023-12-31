import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";

// Redux
import { Provider } from "react-redux";
import Store from "./Redux/Store";
import axios from "axios";

if (localStorage.ETalkUser) {
  const { token } = JSON.parse(localStorage.ETalkUser);
  axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={Store}>
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
