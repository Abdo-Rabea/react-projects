import Header from "./Header";
import CartOverview from "../features/cart/CartOverview.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader.jsx";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout">
      {isLoading && <Loader />}
      <Header />
      {/* no need to conditionaly loading it because it is handled by reactrouter*/}
      <main>{<Outlet />}</main>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
