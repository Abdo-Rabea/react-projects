import { Outlet } from "react-router-dom";
import Heading from "./Heading";
import Sidebar from "./Sidebar";
import Header from "./Header";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100dvh;
  grid-template-columns: minmax(auto, 26rem) 1fr; /* //todo: after newing the min-width do this minmax(m, 1fr)*/
  grid-template-rows: auto 1fr;
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6.4rem;
`;
function AppLayout() {
  return (
    <StyledAppLayout>
      <Header />
      <Sidebar />
      {/* <Heading as="h1">App layout</Heading> */}
      <Main>
        {/* //*every thing is placed directly here so when styling main it will affect childs (outlet is one element or fragment )*/}
        <Outlet />
      </Main>
    </StyledAppLayout>
  );
}

export default AppLayout;
