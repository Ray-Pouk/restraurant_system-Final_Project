
import { useState } from "react";
import Navbar from "./components/Navbar";
import Menu from "./components/Menu";
import Cart from "./components/Cart";
import Reservation from "./components/Reservation";
import Checkout from "./components/Checkout";
import OrderConfirmation from "./components/OrderConfirmation";
import OrderTracking from "./components/OrderTracking";
import CustomerAccount from "./components/CustomerAccount";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);

  // Add items to cart
  function addToCart(item) {
    setCart((currentCart) => {
      const existingItem = currentCart.find(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItem) {
        return currentCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }

      return [...currentCart, { ...item, quantity: 1 }];
    });
  }

  // Remove an item from cart
  function removeFromCart(itemId) {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== itemId)
    );
  }

  // Increase or decrease quantity
  function updateQuantity(itemId, amount) {
    setCart((currentCart) =>
      currentCart
        .map((item) =>
          item.id === itemId
            ? { ...item, quantity: item.quantity + amount }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }

  function placeOrder(newOrder) {
    const completedOrder = {
      ...newOrder,
      orderNumber: Date.now(),
      status: "Pending",
    };

    setOrder(completedOrder);
    setOrderHistory((currentHistory) => [
      ...currentHistory,
      completedOrder,
    ]);
    setCart([]);
  }

  function updateOrderStatus(newStatus) {
    setOrder((currentOrder) => ({
      ...currentOrder,
      status: newStatus,
    }));
  }

  // Calculate total number of items
  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <div>
      <Navbar />

      <h1>Restaurant Management System</h1>

      {order ? (
        <>
          <OrderConfirmation
            order={order}
            onNewOrder={() => setOrder(null)}
          />

          <OrderTracking
            order={order}
            onUpdateStatus={updateOrderStatus}
          />
        </>
      ) : (
        <>
          <Menu onAddToCart={addToCart} />

          <Cart
            cart={cart}
            totalItems={totalItems}
            onRemove={removeFromCart}
            onUpdateQuantity={updateQuantity}
          />

          {cart.length > 0 && (
            <Checkout
              cart={cart}
              onPlaceOrder={placeOrder}
            />
          )}

          <Reservation />

          <CustomerAccount orders={orderHistory} />
        </>
      )}
    </div>
  );


}

export default App;
