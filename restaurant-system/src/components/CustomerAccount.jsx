
import { useState } from "react";

function CustomerAccount({ orders }) {
    const [customer, setCustomer] = useState({
        name: "",
        email: "",
        phone: "",
    });
    const [isSaved, setIsSaved] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [preferences, setPreferences] = useState({
        dietary: "None",
        favoriteCategory: "All",
    });

    const [preferencesSaved, setPreferencesSaved] = useState(false);

    function handleChange(event) {
        const { name, value } = event.target;

        setCustomer((currentCustomer) => ({
            ...currentCustomer,
            [name]: value,
        }));

        setIsSaved(false);
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsSaved(true);
        setIsEditing(false);
    }

    function handlePreferenceChange(event) {
        const { name, value } = event.target;

        setPreferences((currentPreferences) => ({
            ...currentPreferences,
            [name]: value,
        }));

        setPreferencesSaved(false);
    }

    return (
        <div>
            <h2>Customer Account</h2>
            {(!isSaved || isEditing) && (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="name"
                        placeholder="Full Name"
                        value={customer.name}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={customer.email}
                        onChange={handleChange}
                        required
                    />

                    <input
                        type="tel"
                        name="phone"
                        placeholder="Phone Number"
                        value={customer.phone}
                        onChange={handleChange}
                        required
                    />

                    <button type="submit">Save Profile</button>
                </form>
            )}

            {isSaved && !isEditing && (
                <div>
                    <h3>Profile Saved Successfully!</h3>

                    <p>Name: {customer.name}</p>
                    <p>Email: {customer.email}</p>
                    <p>Phone: {customer.phone}</p>

                    <button onClick={() => setIsEditing(true)}>
                        Edit Profile
                    </button>
                </div>
            )}

            <div>
                <h2>My Order History</h2>

                {orders.length > 0 ? (
                    orders.map((order) => (
                        <div key={order.orderNumber}>
                            <h3>Order #{order.orderNumber}</h3>

                            <p>Status: {order.status}</p>

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

                <form
                    onSubmit={(event) => {
                        event.preventDefault();
                        setPreferencesSaved(true);
                    }}
                >
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

                {preferencesSaved && (
                    <div>
                        <h3>Preferences Saved Successfully!</h3>
                        <p>Dietary Requirements: {preferences.dietary}</p>
                        <p>Favourite Category: {preferences.favoriteCategory}</p>
                    </div>
                )}
            </div>

        </div>
    );

}

export default CustomerAccount;
