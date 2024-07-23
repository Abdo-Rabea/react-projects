import { memo, useCallback, useEffect, useState } from "react";
import clickSound from "./ClickSound.m4a";

function Calculator({ workouts, allowSound }) {
  const [number, setNumber] = useState(workouts.at(0).numExercises);
  const [sets, setSets] = useState(3);
  const [speed, setSpeed] = useState(90);
  const [durationBreak, setDurationBreak] = useState(5);
  const [duration, setDuration] = useState(0);

  // const playSound = useCallback(
  //   function () {
  //     if (!allowSound) return;
  //     //* it is just audio api from the browser (browser feature)
  //     const sound = new Audio(clickSound);
  //     sound.play();
  //   },
  //   [allowSound]
  // );
  console.log("re-render");
  //* you are now changing state based on another state=> you should update duration after updating each of others but this will make code very bad
  useEffect(() => {
    setDuration(
      () => (number * sets * speed) / 60 + (sets - 1) * durationBreak
    );
    // playSound()
  }, [durationBreak, number, sets, speed]);

  useEffect(
    function () {
      // you are now using playSound in onePlace so put  the function in the useEffect
      function playSound() {
        if (!allowSound) return;
        //* it is just audio api from the browser (browser feature)
        const sound = new Audio(clickSound);
        sound.play();
      }
      playSound();
    },
    [duration, allowSound]
  );
  // const duration = (number * sets * speed) / 60 + (sets - 1) * durationBreak;
  const mins = Math.floor(duration);
  const seconds = (duration - mins) * 60;

  return (
    <>
      <form>
        <div>
          <label>Type of workout</label>
          <select value={number} onChange={(e) => setNumber(+e.target.value)}>
            {workouts.map((workout) => (
              <option value={workout.numExercises} key={workout.name}>
                {workout.name} ({workout.numExercises} exercises)
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>How many sets?</label>
          <input
            type="range"
            min="1"
            max="5"
            value={sets}
            onChange={(e) => setSets(e.target.value)}
          />
          <span>{sets}</span>
        </div>
        <div>
          <label>How fast are you?</label>
          <input
            type="range"
            min="30"
            max="180"
            step="30"
            value={speed}
            onChange={(e) => setSpeed(e.target.value)}
          />
          <span>{speed} sec/exercise</span>
        </div>
        <div>
          <label>Break length</label>
          <input
            type="range"
            min="1"
            max="10"
            value={durationBreak}
            onChange={(e) => setDurationBreak(e.target.value)}
          />
          <span>{durationBreak} minutes/break</span>
        </div>
      </form>
      <section>
        <button
          onClick={() => {
            setDuration((duration) =>
              duration > 1 ? Math.ceil(duration) - 1 : 0
            );
          }}
        >
          –
        </button>
        <p>
          {mins < 10 && "0"}
          {mins}:{seconds < 10 && "0"}
          {seconds}
        </p>
        <button
          onClick={() => {
            setDuration((duration) => Math.floor(duration) + 1);
          }}
        >
          +
        </button>
      </section>
    </>
  );
}

export default memo(Calculator);
