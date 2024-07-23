import { memo } from "react";
import clickSound from "./ClickSound.m4a";

function ToggleSounds({ allowSound, setAllowSound }) {
  return (
    <button
      className="btn-sound"
      onClick={() => {
        setAllowSound((allow) => !allow);
      }}
    >
      {allowSound ? "🔈" : "🔇"}
    </button>
  );
}

export default memo(ToggleSounds);
