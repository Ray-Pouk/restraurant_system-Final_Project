
import Cart from "../components/Cart";
import Checkout from "../components/Checkout";

function CartPage({
  cart,
  totalItems,
  onRemove,
  onUpdateQuantity,
  onPlaceOrder,
}) {
  return (
    <div>
      <h1>Shopping Cart</h1>

      <Cart
        cart={cart}
        totalItems={totalItems}
        onRemove={onRemove}
        onUpdateQuantity={onUpdateQuantity}
      />

      {cart.length > 0 && (
        <Checkout
          cart={cart}
          onPlaceOrder={onPlaceOrder}
        />
      )}
    </div>
  );
}

export default CartPage;
