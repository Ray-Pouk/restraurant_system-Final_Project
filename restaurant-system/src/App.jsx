
import { useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import MenuPage from "./pages/MenuPage";
import CartPage from "./pages/CartPage";
import ReservationPage from "./pages/ReservationPage";
import AccountPage from "./pages/AccountPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import ProtectedRoute from "./components/ProtectedRoute";
import OrderConfirmationPage from "./pages/OrderConfirmationPage";
import AIAssistant from "./components/AIAssistant";
import { useAuth } from "./context/AuthContext";
import { useRestaurant } from "./context/RestaurantContext";

function App() {
  const [cart, setCart] = useState([]);
  const { addOrder } = useRestaurant();
  const { user } = useAuth();
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
    const savedOrder = addOrder({ ...newOrder, userId: user?.id ?? null });
    setCart([]);
    // Go straight to the confirmation / tracking page for this order
    navigate(`/orders/${savedOrder.orderNumber}`);
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
          element={
            <ProtectedRoute>
              <AccountPage />
            </ProtectedRoute>
          }
        />

        <Route path="/login" element={<LoginPage />} />

        <Route
          path="/admin"
          element={
            <ProtectedRoute adminOnly>
              <AdminPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/orders/:orderNumber"
          element={<OrderConfirmationPage onNewOrder={() => navigate("/menu")} />}
        />
      </Routes>

      <AIAssistant />
    </div>
  );

}

export default App;
