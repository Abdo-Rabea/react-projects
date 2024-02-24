import React, { useState } from "react";
import ReactDOM from "react-dom/client";
// commenting index as the StartRating component must be reusable seperated component that doesn't depend on any other file
import "./index.css";
import App from "./App";
import StarRating from "./StarRating";
const root = ReactDOM.createRoot(document.getElementById("root"));

function Test() {
  const [rate, setRate] = useState(0);
  function onRating(rating) {
    setRate(rating);
  }
  return (
    <>
      <StarRating maxRating={4} onSetRating={onRating} />
      <StarRating
        maxRating={5}
        color="red"
        size={20}
        className="test"
        messages={["bad", "not bad", "okay", "good", "wow"]}
        defaultRating={4}
      />
      <p>you rating is {rate}</p>
    </>
  );
}

root.render(
  <React.StrictMode>
    <App />
    {/* <Test /> */}
  </React.StrictMode>
);
