import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function Navbar() {
  const { user, isLoggedIn, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav>
      <h2>My Restaurant</h2>

      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/menu">Menu</Link></li>
        <li><Link to="/cart">Cart</Link></li>
        <li><Link to="/reservations">Reservations</Link></li>

        {isLoggedIn ? (
          <>
            <li><Link to="/account">Account</Link></li>
            {isAdmin && <li><Link to="/admin">Admin</Link></li>}
            <li>
              Hi, {user.name.split(" ")[0]}{" "}
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <li><Link to="/login">Log In</Link></li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
