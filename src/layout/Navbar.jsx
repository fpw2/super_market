import { Link, NavLink } from "react-router-dom";
import { useSelector } from "react-redux"
import { cartCountSelector } from "../redux/store";

export default function Navbar() {
  const cartCount = useSelector(cartCountSelector)

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        SuperM
      </Link>
      <ul>
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
          <Link to="/cart" className="nav-item nav-cart btn btn-accent">Cart ({cartCount})</Link>
        </li>
      </ul>
    </nav>
  );
}
