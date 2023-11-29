import { NavLink } from "react-router-dom";
import styles from "./AppNav.module.css";

function AppNav() {
  return (
    <div className={styles.nav}>
      <ul>
        <li>
          <NavLink to="requests">requests</NavLink>
        </li>
        <li>
          <NavLink to="supplies">supplies</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default AppNav;
