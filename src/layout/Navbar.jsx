import { Link, NavLink } from "react-router-dom";

export default function Navbar(props) {
  const {cart} = props

  // summ of quantity in all cart
  const quantityCart = cart.reduce((total, product) => {
    return total + product.quantity
  },0)

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
          <Link to="/cart" className="nav-item nav-cart btn btn-accent">Cart ({quantityCart})</Link>
        </li>
      </ul>
    </nav>
  );
}
