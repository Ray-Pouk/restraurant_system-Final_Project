import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="hero">
      <h1>Page Not Found</h1>
      <p>Sorry, we couldn't find the page you were looking for.</p>
      <Link to="/">
        <button>Back to Home</button>
      </Link>
    </div>
  );
}

export default NotFound;
