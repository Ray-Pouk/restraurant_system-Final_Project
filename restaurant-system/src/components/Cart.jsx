
function Cart({ cart, totalItems, onRemove, onUpdateQuantity }) {
  // Calculate subtotal
  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div>
      <h2>Shopping Cart ({totalItems})</h2>

      {cart.length === 0 ? (
        <p>Your shopping cart is empty.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id}>
              <h3>{item.name}</h3>

              <p>Price: ${item.price.toFixed(2)}</p>

              <p>
                Quantity: {item.quantity}
              </p>

              <p>
                Item Total: $
                {(item.price * item.quantity).toFixed(2)}
              </p>

              {/* Quantity Controls */}
              <button
                onClick={() => onUpdateQuantity(item.id, -1)}
              >
                -
              </button>

              <span> {item.quantity} </span>

              <button
                onClick={() => onUpdateQuantity(item.id, 1)}
              >
                +
              </button>

              {/* Remove Item */}
              <button
                onClick={() => onRemove(item.id)}
              >
                Remove
              </button>

              <hr />
            </div>
          ))}

          <h3>Subtotal: ${subtotal.toFixed(2)}</h3>
        </>
      )}
    </div>
  );
}

export default Cart;
