/**benefits:
 * 1. create action creators from our reducers and also the action type  so no need to the switch cases
 * 2. default case are automaticlly handeld return state; -> return;
 * 3. we can actually mutate now our reducers but (immer will convert ourlogic back to unimutable so don't worry) (beggist advantage)
 */
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: "",
  isLoading: false,
}; // remeber each one of these is a global state

const accountSlice = createSlice({
  name: "account",
  initialState,
  // think of it as small reducer (they are really the logic inside reducer function so it is normal to call them reducers)
  reducers: {
    deposit(state, action) {
      // it is really a reducer and the corresponding action creator is account/deposit by and the consequence of this the action.payload is just a single value not as much as you could so I will use prepare
      // note: no return here. you are actually mutating state
      state.balance += action.payload;
      state.isLoading = false;
    },
    /**this is really a reducer but the corresponding action creator is done by default which has the next shape by default
     * function withdraw(value){ // created automatically so you have no controll over the number of passed parameter like the previous method unliss you use prepare or pass {}
     *   return {type:"account/withdraw", payLoad: value}
     * }
     */
    withdraw(state, action) {
      state.balance -= action.payload;
    },

    requestLoan: {
      prepare(amount, purpose) {
        return { payload: { amount, purpose } }; // redefine payload
      },
      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan += action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },

    payLoan(state, action) {
      state.balance -= state.loan;
      state.loan = 0;
      state.loanPurpose = "";
    },
    loading(state, action) {
      state.isLoading = true;
    },
  },
});
console.log(accountSlice);
// note in the old way you are the one who creates the action creators
export function deposit(amount, currency) {
  if (currency === "USD") return { type: "account/deposit", payload: amount };
  return async function convertCurrency(dispatch, getState) {
    // api call
    dispatch({ type: "account/loading" }); // no grouping of dispatched actions here
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );
    const data = await res.json();
    const converted = data.rates.USD;
    // console.log(getState()); // it is really the states store in the store

    // dispatch action
    // so you have delayed the action to the point you haved recieved the data
    dispatch({ type: "account/deposit", payload: converted });
  };
}
export default accountSlice.reducer;
export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

// initiaState here because you where using it inside the useReducer(reducer, initialState)
// export default function accountReducer(state = initialState, action) {
//   switch (action.type) {
//     case "account/deposit":
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         isLoading: false,
//       };
//     case "account/withdraw":
//       return { ...state, balance: state.balance - action.payload };
//     case "account/requestLoan":
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case "account/payLoan":
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loan: 0,
//         loanPurpose: "",
//       };
//     case "account/loading":
//       return { ...state, isLoading: true };
//     default:
//       return state;
//   }
// }

// action creators functions for account(NO longer used)
// export function deposit(amount, currency) {
//   if (currency === "USD") return { type: "account/deposit", payload: amount };
//   return async function convertCurrency(dispatch, getState) {
//     // api call
//     dispatch({ type: "account/loading" }); // no grouping of dispatched actions here
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );
//     const data = await res.json();
//     const converted = data.rates.USD;
//     // console.log(getState()); // it is really the states store in the store

//     // dispatch action
//     // so you have delayed the action to the point you haved recieved the data
//     dispatch({ type: "account/deposit", payload: converted });
//   };
// }
// export function withdraw(amount) {
//   return { type: "account/withdraw", payload: amount };
// }
// export function requestLoan(amount, purpose) {
//   return {
//     type: "account/requestLoan",
//     payload: { amount, purpose },
//   };
// }
// export function payLoan() {
//   return { type: "account/payLoan" };
// }

// Note: we usually export Actions Creators as named export but Reducer as default
