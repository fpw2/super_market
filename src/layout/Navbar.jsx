import { Link, NavLink } from "react-router-dom";
import {useContext} from "react"
import { AppContext } from "../context/AppContext"
import Button from "../ui-kit/Button";

export default function Navbar() {
  /**
   * Using a context
   */
  const app = useContext(AppContext)
  const lightheme = app.lightheme

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        SuperM
      </Link>
      <ul>
        <li className="nav-item">
          <Button className="theme-switcher" onClick={app.handleThemeClick}>{lightheme ? "Dark" : "Light"}</Button>
        </li>
        <li className="nav-item">
          <NavLink to="/home" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>About us</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/products" className={({ isActive }) => (isActive ? "nav-item-active" : "")}>Products</NavLink>
        </li>
        <li>
          <Link to="/cart" className="nav-item nav-cart btn btn-accent">Cart ({app.getCartQuantity()})</Link>
        </li>
      </ul>
    </nav>
  );
}
