import { combineReducers, createStore } from "redux";
const initialStateAccount = { balance: 0, loan: 0, loanPurpose: "" };
const initialStateCustomer = { fullName: "", nationalId: "", createdAt: "" };

// initiaState here because you where using it inside the useReducer(reducer, initialState)
function accountReducer(state = initialStateAccount, action) {
  switch (action.type) {
    case "account/deposit":
      return { ...state, balance: state.balance + action.payload };
    case "account/withdraw":
      return { ...state, balance: state.balance - action.payload };
    case "account/requestLoan":
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case "account/payLoan":
      return {
        ...state,
        balance: state.balance - state.loan,
        loan: 0,
        loanPurpose: "",
      };
    default:
      return state;
  }
}
// customer procedure
function customerReducer(state = initialStateCustomer, action) {
  switch (action.type) {
    case "customer/createCustomer":
      return {
        ...state,
        fullName: action.payload.fullName,
        nationalId: action.payload.nationalId,
        createdAt: action.payload.createdAt,
      };

    case "customer/updateName":
      return {
        ...state,
        fullName: action.payload.fullName,
      };

    default:
      return state;
  }
}

// action creators functions for account(NO longer used)
function deposit(amount) {
  return { type: "account/deposit", payload: amount };
}
function withdraw(amount) {
  return { type: "account/withdraw", payload: amount };
}
function requestLoan(amount, purpose) {
  return {
    type: "account/requestLoan",
    payload: { amount, purpose },
  };
}
function payLoan() {
  return { type: "account/payLoan" };
}

// action creators functions for customer(NO longer used)
function CreateCustomer(fullName, nationalId) {
  return {
    type: "customer/createCustomer",
    payload: { fullName, nationalId, createdAt: new Date().toISOString() }, // you should have written new Date inside reducer as you should have as much logic as you can inside the reducer but this is side effect so pass it
  };
}
function updateName(fullName) {
  return { type: "customer/updateName", fullName };
}
// to dispatch customer actions you must combine in one root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});
const store = createStore(rootReducer);

// Note: that redux is smart enough to know which acion belongs to which reducer
// tesing account
store.dispatch(deposit(500));
console.log(store.getState());
store.dispatch(withdraw(200));
console.log(store.getState());
store.dispatch(requestLoan(2000, "buy shawerma"));
console.log(store.getState());
store.dispatch(payLoan());
console.log(store.getState());

// tesing customer
store.dispatch(CreateCustomer("abdo Ahmed", "123123123"));
console.log(store.getState());
