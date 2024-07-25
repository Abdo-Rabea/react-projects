import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
// features to put all components, pages and logic in one place (there are no page folder to groub in one file)
// services to put all apis in it
// ui: to put all ui reusable components; all of these components don't fit in the features
// utils: to put helpers but not async. functions

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
