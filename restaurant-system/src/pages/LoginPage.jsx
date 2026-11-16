import { useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const { isLoggedIn, isAdmin, signup, login } = useAuth();
  const location = useLocation();
  const redirectTo = location.state?.from || (isAdmin ? "/admin" : "/account");

  const [mode, setMode] = useState("login"); // "login" or "signup"
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [error, setError] = useState("");

  // Already signed in: nothing to do here
  if (isLoggedIn) {
    return <Navigate to={redirectTo} replace />;
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleSubmit(event) {
    event.preventDefault();

    const message =
      mode === "login"
        ? login(form.email, form.password)
        : signup(form);

    // On success the page re-renders as logged in and redirects (see above),
    // using the new user's role.
    if (message) setError(message);
  }

  function switchMode() {
    setMode((current) => (current === "login" ? "signup" : "login"));
    setError("");
  }

  return (
    <div>
      <h1>{mode === "login" ? "Log In" : "Create Account"}</h1>

      <form onSubmit={handleSubmit}>
        {mode === "signup" && (
          <>
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={form.phone}
              onChange={handleChange}
              required
            />
          </>
        )}

        <input
          type="email"
          name="email"
          placeholder="Email Address"
          value={form.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          required
        />

        {error && <p role="alert">{error}</p>}

        <button type="submit">
          {mode === "login" ? "Log In" : "Sign Up"}
        </button>
      </form>

      <p>
        {mode === "login" ? "No account yet? " : "Already have an account? "}
        <button type="button" onClick={switchMode}>
          {mode === "login" ? "Create one" : "Log in"}
        </button>
      </p>

      {mode === "login" && (
        <p>
          <small>Demo admin: admin@restaurant.com / admin123</small>
        </p>
      )}

      <p>You can also browse and order without an account.</p>
    </div>
  );
}

export default LoginPage;
