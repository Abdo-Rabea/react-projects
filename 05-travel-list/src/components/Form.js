import { useState } from "react";

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = {
      id: Date.now(),
      description: description,
      quantity: quantity,
      packed: false,
    };

    onAddItems(newItem);
    // very powerfule
    setQuantity(1);
    setDescription("");
    // but ofcourse not the react way
    // console.log(e);
    // console.log(e.target[1].value);
  }
  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>what do you need for your 😍 trip</h3>
      <select value={quantity} onChange={(e) => setQuantity(+e.target.value)}>
        {Array.from({ length: 20 }, (_, i) => i + 1).map((e) => (
          <option key={e}>{e}</option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        // if you don't provide onChange the value will always be description because state will never change (and what happens in state appear in view)
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></input>
      <button>Add</button>
    </form>
  );
}
