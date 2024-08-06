import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAddress } from "../../services/apiGeocoding";
import { builders } from "prettier/doc.js";

function getPosition() {
  return new Promise(function (resolve, reject) {
    navigator.geolocation.getCurrentPosition(resolve, reject);
  });
}

// action creator function that we called in our code :)  ;
//! don't name it getAddress because get is reserved for selector functions
export const fetchAddress = createAsyncThunk(
  //* action name
  "user/fetchAddress",
  //* this function need to return promise so anonymous function is ideal here
  async function () {
    // 1) We get the user's geolocation position
    const positionObj = await getPosition();
    const position = {
      latitude: positionObj.coords.latitude,
      longitude: positionObj.coords.longitude,
    };

    // 2) Then we use a reverse geocoding API to get a description of the user's address, so we can display it the order form, so that the user can correct it if wrong
    const addressObj = await getAddress(position);
    const address = `${addressObj?.locality}, ${addressObj?.city} ${addressObj?.postcode}, ${addressObj?.countryName}`;

    // 3) Then we return an object with the data that we are interested in
    //* this is the payload of the fulfilled state
    return { position, address };
  },
);

const initialState = {
  username: "",
  status: "idle",
  //* remote global state => recall the image from john
  position: {},
  address: "",
  error: "",
};
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    // action creators (simply same as the function in reducer )
    updateName(state, action) {
      state.username = action.payload;
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "idle"; // finished :-)
        state.position = action.payload.position;
        state.address = action.payload.address;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        //* note the error is handeled automatically and you have here the error object which contain the message
        state.status = "error";
        //! note the error here
        // state.error = action.error.message;
        state.error =
          "There was a problem getting your address. Make sure to fill this field!";
      }),
});

export const { updateName } = userSlice.actions; // give you access to the actions creators

export default userSlice.reducer; // to access from store which make it global
