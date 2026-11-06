
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <h2>My Restaurant</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>
        <li><Link to="/account">Account</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;
