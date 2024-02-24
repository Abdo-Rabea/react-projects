import { createSlice } from "@reduxjs/toolkit";

const initialState = { fullName: "", nationalId: "", createdAt: "" };

const customerSlice = createSlice({
  name: "customer",
  initialState,
  reducers: {
    createCustomer: {
      prepare: function (fullName, nationalId) {
        return {
          payload: {
            fullName,
            nationalId,
            createdAt: new Date().toISOString(),
          },
        };
      },
      reducer(state, action) {
        state.fullName = action.payload.fullName;
        state.nationalId = action.payload.nationalId;
        state.createdAt = action.payload.createdAt;
      },
    },
    updateName(state, action) {
      state.fullName = action.payload;
    },
  },
});
export default customerSlice.reducer;
export const { createCustomer, updateName } = customerSlice.actions;

// // customer procedure
// export default function customerReducer(state = initialState, action) {
//   switch (action.type) {
//     case "customer/createCustomer":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//         nationalId: action.payload.nationalId,
//         createdAt: action.payload.createdAt,
//       };

//     case "customer/updateName":
//       return {
//         ...state,
//         fullName: action.payload.fullName,
//       };

//     default:
//       return state;
//   }
// }

// // action creators functions for customer(NO longer used)
// export function CreateCustomer(fullName, nationalId) {
//   return {
//     type: "customer/createCustomer",
//     payload: { fullName, nationalId, createdAt: new Date().toISOString() }, // you should have written new Date inside reducer as you should have as much logic as you can inside the reducer but this is side effect so pass it
//   };
// }
// export function updateName(fullName) {
//   return { type: "customer/updateName", fullName };
// }
