import { Outlet } from "react-router-dom";
import AppNave from "./AppNav";
import Logo from "./Logo";
import styles from "./Sidebar.module.css";
function Sidebar() {
  return (
    <div className={styles.sidebar}>
      <Logo />
      <AppNave />
      <Outlet />
      <footer className={styles.footer}>
        <p className={styles.copyright}>
          &copy;Copyright {new Date().getFullYear()} AbdoRabea
        </p>
      </footer>
    </div>
  );
}

export default Sidebar;
