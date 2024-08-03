import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import UserName from "../features/user/UserName";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-b-stone-200 bg-yellow-500 px-4 py-3 uppercase">
      <Link to="/" className="font-semibold tracking-widest">
        Fast React Pizza Co.
      </Link>
      {/* //*search order is used in header but it is created in order feature (so the golden rule is to group the feature in the correct place and use it anywhere you want) */}
      <SearchOrder />
      <UserName />
    </header>
  );
}

export default Header;
