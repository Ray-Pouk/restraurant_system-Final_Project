import { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useRestaurant } from "../context/RestaurantContext";

function CustomerAccount() {
  const { user, updateProfile } = useAuth();
  const { orders } = useRestaurant();

  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user.name,
    phone: user.phone,
  });
  const [preferences, setPreferences] = useState(user.preferences);
  const [preferencesSaved, setPreferencesSaved] = useState(false);

  // Customers only ever see their own orders
  const myOrders = orders.filter((order) => order.userId === user.id);

  function handleProfileChange(event) {
    const { name, value } = event.target;
    setProfile((current) => ({ ...current, [name]: value }));
  }

  function handleProfileSubmit(event) {
    event.preventDefault();
    updateProfile({ name: profile.name.trim(), phone: profile.phone.trim() });
    setIsEditing(false);
  }

  function handlePreferenceChange(event) {
    const { name, value } = event.target;
    setPreferences((current) => ({ ...current, [name]: value }));
    setPreferencesSaved(false);
  }

  function handlePreferencesSubmit(event) {
    event.preventDefault();
    updateProfile({ preferences });
    setPreferencesSaved(true);
  }

  return (
    <div>
      <h2>Customer Account</h2>

      {isEditing ? (
        <form onSubmit={handleProfileSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={profile.name}
            onChange={handleProfileChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={profile.phone}
            onChange={handleProfileChange}
          />
          <button type="submit">Save Profile</button>
          <button type="button" onClick={() => setIsEditing(false)}>
            Cancel
          </button>
        </form>
      ) : (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Phone: {user.phone || "Not provided"}</p>
          <p>Account type: {user.role}</p>
          <button onClick={() => setIsEditing(true)}>Edit Profile</button>
        </div>
      )}

      <div>
        <h2>My Order History</h2>

        {myOrders.length > 0 ? (
          myOrders.map((order) => (
            <div key={order.orderNumber}>
              <h3>Order #{order.orderNumber}</h3>
              <p>Status: {order.status}</p>
              <Link to={`/orders/${order.orderNumber}`}>
                Track order / leave feedback
              </Link>
              <h4>Items Ordered:</h4>
              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} x {item.quantity} - $
                  {(item.price * item.quantity).toFixed(2)}
                </p>
              ))}
            </div>
          ))
        ) : (
          <p>You haven't placed any orders yet.</p>
        )}
      </div>

      <div>
        <h2>My Preferences</h2>
        <p>These pre-select your filters on the Menu page and guide the AI assistant.</p>

        <form onSubmit={handlePreferencesSubmit}>
          <label>Dietary Requirements:</label>
          <select
            name="dietary"
            value={preferences.dietary}
            onChange={handlePreferenceChange}
          >
            <option value="None">No Restrictions</option>
            <option value="Vegetarian">Vegetarian</option>
            <option value="Vegan">Vegan</option>
            <option value="Gluten-Free">Gluten-Free</option>
          </select>

          <br />

          <label>Favourite Menu Category:</label>
          <select
            name="favoriteCategory"
            value={preferences.favoriteCategory}
            onChange={handlePreferenceChange}
          >
            <option value="All">All Categories</option>
            <option value="Starters">Starters</option>
            <option value="Mains">Mains</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>

          <br />

          <button type="submit">Save Preferences</button>
        </form>

        {preferencesSaved && <p role="status">Preferences saved!</p>}
      </div>
    </div>
  );
}

export default CustomerAccount;
