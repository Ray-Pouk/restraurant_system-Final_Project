
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ReservationPage from "./pages/ReservationPage";
import AccountPage from "./pages/AccountPage";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";

function App() {
  const [cart, setCart] = useState([]);
  const [order, setOrder] = useState(null);
  const [orderHistory, setOrderHistory] = useState([]);
  const navigate = useNavigate();

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

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/menu"
          element={<MenuPage onAddToCart={addToCart} />}
        />

        <Route
          path="/cart"
          element={
            <CartPage
              cart={cart}
              totalItems={totalItems}
              onRemove={removeFromCart}
              onUpdateQuantity={updateQuantity}
              onPlaceOrder={placeOrder}
            />
          }
        />

        <Route
          path="/reservations"
          element={<ReservationPage />}
        />

        <Route
          path="/account"
          element={<AccountPage orders={orderHistory} />}
        />

        <Route
          path="/order-confirmation"
          element={
            <OrderConfirmationPage
              order={order}
              onNewOrder={() => {
                setOrder(null);
                navigate("/menu");
              }}
              onUpdateStatus={updateOrderStatus}
            />
          }
        />
      </Routes>
    </div>
  );

}

export default App;
