// note that you don't need actions creators here because the component who uses the dispatch will use the action creators
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
// import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import { thunk } from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

import { configureStore } from "@reduxjs/toolkit";
// note you don't need even to install thunks or devtool
const store = configureStore({
  //  root reducer
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

// all of this happens inside configureStore as it is just a wrapper with other stuf
// to dispatch customer actions you must combine in one root reducer
// const rootReducer = combineReducers({
//   // account here is a selector
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );
export default store;
