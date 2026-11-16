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
    <nav
      style={{
        position: "sticky",
        top: 0,
        zIndex: 900,
        background: "#fff",
        borderBottom: "1px solid #ccc",
      }}
    >
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
              Logged in as {user.name.split(" ")[0]} ({isAdmin ? "Admin" : "Customer"}){" "}
              <button onClick={handleLogout}>Log Out</button>
            </li>
          </>
        ) : (
          <li>
            Browsing as guest · <Link to="/login">Log In</Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
