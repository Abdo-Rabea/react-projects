import { Outlet } from "react-router-dom";

import Map from "../components/Map";
import Sidebar from "../components/Sidebar";
import styles from "./AppLayout.module.css";
import User from "../components/User";
function AppLayout() {
  return (
    <div className={styles.app}>
      {/* you can do component composition for the side bar but because there 
      is no probs drilling here so it is good to all the code inside the component*/}
      <Sidebar />
      <Map />
      <User />
    </div>
  );
}

export default AppLayout;
