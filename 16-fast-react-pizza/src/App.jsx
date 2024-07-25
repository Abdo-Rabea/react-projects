import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./ui/Home.jsx";
import Error from "./ui/Error.jsx";
import Menu, { loader as menuLoader } from "./features/menu/Menu.jsx";
import Cart from "./features/cart/Cart.jsx";
import Order from "./features/order/order.jsx";
import CreateOrder from "./features/order/CreateOrder.jsx";
import AppLayout from "./ui/AppLayout.jsx";

const router = createBrowserRouter([
  {
    // doesn't have a path so it is called a layout route
    element: <AppLayout />,
    errorElement: <Error />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/menu",
        element: <Menu />,
        // 2. connect the loader function to the rout
        loader: menuLoader,
        //* the error bubles up as you know so if it doesn't be handled here it will bubble up to the parent
        errorElement: <Error />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        // new route and not child of order as it is an entire page and not a composite child (like navigation between images anything)
        path: "/order/new",
        element: <CreateOrder />,
      },
      {
        path: "/order/:OrderId",
        element: <Order />,
      },
    ],
  },
  //* every object is a route

  //// there is a special way to Handle notFound pages
  //// {
  ////   path: "*",
  ////   element: <NotFound message="this page doesn't exist" />,
  //// },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
