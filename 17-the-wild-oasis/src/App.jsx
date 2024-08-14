import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import PageNotFound from "./pages/PageNotFound";
import Bookings from "./pages/Bookings";
import Account from "./pages/Account";
import Users from "./pages/Users";
import Settings from "./pages/Settings";
// import Login from "./pages/Login";
import Cabins from "./pages/Cabins";
import GlobalStyles from "./styles/GlobalStyles";
import Login from "./pages/Login";
import AppLayout from "./ui/AppLayout";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // the time before next re-fetch
      staleTime: 60 * 1000,
    },
  },
});
function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools buttonPosition="bottom-left" position="bottom" />
      <GlobalStyles />
      <BrowserRouter>
        <Routes>
          {/* //*it is called AppLayout because it doesn't have path prop for the parent
           */}
          <Route element={<AppLayout />}>
            <Route index element={<Navigate to="dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="bookings" element={<Bookings />} />
            <Route path="cabins" element={<Cabins />} />
            <Route path="users" element={<Users />} />
            <Route path="settings" element={<Settings />} />
            <Route path="account" element={<Account />} />
          </Route>
          <Route path="login" element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
