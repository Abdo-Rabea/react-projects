import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import "./index.css";

// run the file ./App and get the App component back
import App from "./App";
// import "./store"; // just copy past the file not the regular import export
import store from "./store";
// import { deposit } from "./features/accounts/accountSlice";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    {/* so now our application know about redux store which means every single component in the app can read data from the store and dispatch actions to it */}
    {/* simply broadcasting global state to every component that want to use it */}
    {/* store={store} : realy App has access to only one store*/}
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
