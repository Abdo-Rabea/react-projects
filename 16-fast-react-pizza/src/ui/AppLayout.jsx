import Header from "./Header";
import CartOverview from "../features/cart/CartOverview.jsx";
import { Outlet, useNavigation } from "react-router-dom";
import Loader from "./Loader.jsx";
function AppLayout() {
  const navigation = useNavigation();
  const isLoading = navigation.state === "loading";
  return (
    <div className="layout grid h-screen grid-rows-[auto_1fr_auto]">
      {isLoading && <Loader />}
      <Header />
      {/* no need to conditionaly loading it because it is handled by reactrouter*/}
      <div className="overflow-auto">
        <main className="mx-auto max-w-3xl">{<Outlet />}</main>
      </div>
      <CartOverview />
    </div>
  );
}

export default AppLayout;
