import { Link } from "react-router-dom";

function CartOverview() {
  return (
    // items-center no effect as the both texts have the same size
    <div className="flex items-center justify-between bg-stone-800 p-4 uppercase text-stone-200">
      <p className="space-x-4 text-sm font-semibold text-stone-300 md:text-base">
        <span>23 pizzas</span>
        <span>$23.45</span>
      </p>

      <Link to="/cart">Open cart &rarr;</Link>
    </div>
  );
}

export default CartOverview;
