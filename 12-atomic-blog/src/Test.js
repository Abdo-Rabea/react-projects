import { useState } from "react";

export function SlowComponent() {
  // If this is too slow on your maching, reduce the `length`
  const words = Array.from({ length: 100_000 }, () => "WORD");
  return (
    <ul>
      {words.map((word, i) => (
        <li key={i}>
          {i}: {word}
        </li>
      ))}
    </ul>
  );
}

function Counter({ children, slowComp }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <h1>Slow counter?!?</h1>
      <button onClick={() => setCount((c) => c + 1)}>Increase: {count}</button>
      {slowComp}
      {/* //* note how the slowComponent doesn't really use any state of the Test so it doesn't depends on it */}
    </div>
  );
}

export default function Test() {
  return (
    <Counter>
      {/*//* its really a prop that is passed to the counter so it rendered (existed) before the parent component and also doesn't depend on it (so no need to rernder the children) */}
      <SlowComponent />
    </Counter>
  );
}
