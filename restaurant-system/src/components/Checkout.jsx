
import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Checkout({ cart, onPlaceOrder }) {
  const { user } = useAuth();
  const [orderType, setOrderType] = useState("Pickup");
  const [name, setName] = useState(user?.name ?? "");
  const [phone, setPhone] = useState(user?.phone ?? "");
  const [address, setAddress] = useState("");
  const [errors, setErrors] = useState({});

  function handleSubmit(event) {
    event.preventDefault();

    const newErrors = {};
    const digits = phone.replace(/\D/g, "");
    if (digits.length < 10 || digits.length > 15) {
      newErrors.phone = "Enter a valid phone number (10-15 digits).";
    }
    if (orderType === "Delivery" && address.trim().length < 5) {
      newErrors.address = "Please enter a complete delivery address.";
    }
    if (cart.length === 0) {
      newErrors.cart = "Your cart is empty.";
    }
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const order = {
      customerName: name.trim(),
      phone: phone.trim(),
      orderType: orderType,
      address: orderType === "Delivery" ? address.trim() : "",
      items: cart,
    };

    onPlaceOrder(order);
  }

  return (
    <div className="card">
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <h3>Customer Information</h3>

        <p>
          {user
            ? `Ordering as ${user.name} (${user.role === "admin" ? "Admin" : "Customer"}). This order will appear in your order history.`
            : "Ordering as a guest. Log in to save this order to your history."}
        </p>

        <input
          type="text"
          placeholder="Full Name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          required
        />

        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(event) => setPhone(event.target.value)}
          required
        />
        {errors.phone && <p role="alert">{errors.phone}</p>}

        <h3>Order Type</h3>

        <select
          value={orderType}
          onChange={(event) => setOrderType(event.target.value)}
        >
          <option value="Pickup">Pickup</option>
          <option value="Delivery">Delivery</option>
        </select>

        {orderType === "Delivery" && (
          <div>
            <h3>Delivery Address</h3>

            <input
              type="text"
              placeholder="Enter Delivery Address"
              value={address}
              onChange={(event) => setAddress(event.target.value)}
              required
            />
            {errors.address && <p role="alert">{errors.address}</p>}
          </div>
        )}

        {errors.cart && <p role="alert">{errors.cart}</p>}

        <button type="submit" disabled={cart.length === 0}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
