import { useState } from "react";
import Item from "./Item";

export default function PackingList({
  items,
  onDeleteItem,
  onUpdateItem,
  onClear,
}) {
  const [sortBy, setSortBy] = useState("input");
  let sortedItems = items.slice();
  // if (sortBy === "input") sortedItems = items;
  if (sortBy === "description")
    sortedItems.sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === "packed")
    sortedItems.sort((a, b) => Number(a.packed) - Number(b.packed));
  // sortedItems ;
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            key={item.id}
            onDeleteItem={onDeleteItem}
            onUpdateItem={onUpdateItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button onClick={() => onClear()}>Clear list</button>
      </div>
    </div>
  );
}
