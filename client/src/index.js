import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes } from "react-router-dom";
import { Provider } from "react-redux";

import Application from "./Application";

//store
import store from "./store";

import "./styles/styles.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <Application />
    </BrowserRouter>
  </Provider>
  // </React.StrictMode>
);
