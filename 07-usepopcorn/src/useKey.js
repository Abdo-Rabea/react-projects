import { useEffect } from "react";
export function useKey(key, callback) {
  useEffect(
    function () {
      function handlePress(e) {
        if (e.code.toLowerCase() === key.toLowerCase()) {
          callback();
        }
      }
      document.addEventListener("keydown", handlePress);

      return function () {
        document.removeEventListener("keydown", handlePress);
      };
    },
    [callback, key]
  );
}
