function MenuItem({ item, onAddToCart }) {
  return (
    <div>
      <h3>{item.name}</h3>

      <p>Category: {item.category}</p>

      <p>{item.description}</p>

      <p>Ingredients: {item.ingredients}</p>

      <p>${item.price.toFixed(2)}</p>

      <button onClick={() => onAddToCart(item)}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuItem;