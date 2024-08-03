import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";
import MenuItem from "./MenuItem";

function Menu() {
  // 3. get that data into the component (react router will fire the request off along wise with the component rendering)
  const menu = useLoaderData();
  console.log(menu);
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem key={pizza.id} pizza={pizza} />
      ))}
    </ul>
  );
}

// 1. create the loader function (could be in any place)
//* looks like useEffect in the component to start fetching
export async function loader() {
  const menu = await getMenu();
  return menu;
}
export default Menu;
