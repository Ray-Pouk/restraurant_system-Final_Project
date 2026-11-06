
import { Link } from "react-router-dom";

function Home() {
  return (
    <div>
      <h1>Welcome to My Restaurant</h1>

      <p>
        Welcome to our restaurant! Browse our menu,
        order your favourite meals, or reserve a table.
      </p>

      <div>
        <Link to="/menu">
          <button>View Our Menu</button>
        </Link>

        <Link to="/reservations">
          <button>Make a Reservation</button>
        </Link>
      </div>
    </div>
  );
}

export default Home;
