// note that you don't need actions creators here because the component who uses the dispatch will use the action creators
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import accountReducer from "./features/accounts/accountSlice";
import customerReducer from "./features/customers/customerSlice";
import { thunk } from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";

// to dispatch customer actions you must combine in one root reducer
const rootReducer = combineReducers({
  // account here is a selector
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(thunk))
);
export default store;
// Note: that redux is smart enough to know which acion belongs to which reducer
// tesing account
// store.dispatch(deposit(500));
// console.log(store.getState());
// store.dispatch(withdraw(200));
// console.log(store.getState());
// store.dispatch(requestLoan(2000, "buy shawerma"));
// console.log(store.getState());
// store.dispatch(payLoan());
// console.log(store.getState());

// // tesing customer
// store.dispatch(CreateCustomer("abdo Ahmed", "123123123"));
// console.log(store.getState());
