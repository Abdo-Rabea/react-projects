import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";
function AppNave() {
  return (
    <nav className={styles.nav}>
      <ul>
        <li>
          <NavLink to="cities">cities</NavLink>
        </li>
        <li>
          <NavLink to="countries">countires</NavLink>
        </li>
      </ul>
    </nav>
  );
}

export default AppNave;
