
import { useState } from "react";

function Checkout({ cart, onPlaceOrder }) {
  const [orderType, setOrderType] = useState("Pickup");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function handleSubmit(event) {
    event.preventDefault();

    const order = {
      customerName: name,
      phone: phone,
      orderType: orderType,
      address: orderType === "Delivery" ? address : "",
      items: cart,
    };

    onPlaceOrder(order);
  }

  return (
    <div>
      <h2>Checkout</h2>

      <form onSubmit={handleSubmit}>
        <h3>Customer Information</h3>

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
          </div>
        )}

        <button type="submit" disabled={cart.length === 0}>
          Place Order
        </button>
      </form>
    </div>
  );
}

export default Checkout;
