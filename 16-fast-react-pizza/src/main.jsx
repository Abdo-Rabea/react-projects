import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store.js";
// features to put all components, pages and logic in one place (there are no page folder to groub in one file)
// services to put all apis in it
// ui: to put all ui reusable components; all of these components don't fit in the features
// utils: to put helpers but not async. functions

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
);
