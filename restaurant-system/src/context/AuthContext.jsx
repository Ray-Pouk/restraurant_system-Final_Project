import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

// NOTE: A1 is frontend-only, so accounts live in localStorage and passwords are
// stored in plain text. In A2 this moves to the backend (hashed passwords + JWT).
const AuthContext = createContext(null);

const defaultPreferences = { dietary: "None", favoriteCategory: "All" };

// Demo admin so the admin dashboard (step 7) can be reached.
const seedUsers = [
  {
    id: 1,
    name: "Restaurant Admin",
    email: "admin@restaurant.com",
    phone: "",
    password: "admin123",
    role: "admin",
    preferences: defaultPreferences,
  },
];

export function AuthProvider({ children }) {
  const [users, setUsers] = useLocalStorage("srms_users", seedUsers);
  const [sessionUserId, setSessionUserId] = useLocalStorage(
    "srms_session",
    null
  );

  const user = users.find((u) => u.id === sessionUserId) || null;

  // Each of these returns an error message string, or null on success.
  function signup({ name, email, phone, password }) {
    const cleanEmail = email.trim().toLowerCase();

    if (password.length < 6) {
      return "Password must be at least 6 characters.";
    }
    if (users.some((u) => u.email === cleanEmail)) {
      return "An account with that email already exists.";
    }

    const newUser = {
      id: Date.now(),
      name: name.trim(),
      email: cleanEmail,
      phone: phone.trim(),
      password,
      role: "customer",
      preferences: defaultPreferences,
    };
    setUsers((current) => [...current, newUser]);
    setSessionUserId(newUser.id);
    return null;
  }

  function login(email, password) {
    const found = users.find(
      (u) => u.email === email.trim().toLowerCase() && u.password === password
    );
    if (!found) return "Incorrect email or password.";
    setSessionUserId(found.id);
    return null;
  }

  function logout() {
    setSessionUserId(null);
  }

  function updateProfile(changes) {
    setUsers((current) =>
      current.map((u) => (u.id === sessionUserId ? { ...u, ...changes } : u))
    );
  }

  const value = {
    user,
    isLoggedIn: user !== null,
    isAdmin: user?.role === "admin",
    signup,
    login,
    logout,
    updateProfile,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used inside AuthProvider");
  }
  return context;
}
