export default function Stats({ items }) {
  // numItems - packedItems
  const numItems = items.length;
  const numPacked = items.reduce((p, item) => p + +item.packed, 0);
  return (
    <footer className="stats">
      <em>
        {numItems === 0
          ? `start adding some items to your packing list🚀`
          : numItems === numPacked
          ? `YOU ARE READY TO GO✈️`
          : `you have ${numItems} items in your list. you already packed ${numPacked} (
        ${Math.round((numPacked * 100) / numItems)}%)`}
      </em>
    </footer>
  );
}
