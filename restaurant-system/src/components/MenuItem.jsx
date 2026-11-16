function MenuItem({ item, onAddToCart }) {
  return (
    <div>
      <h3>
        {item.name}
        {item.isSpecial && " ⭐ Today's Special"}
        {item.popular && " 🔥 Popular"}
      </h3>

      <p>Category: {item.category}</p>

      <p>{item.description}</p>

      <p>Ingredients: {item.ingredients}</p>

      {item.dietary.length > 0 && (
        <p>Dietary: {item.dietary.join(", ")}</p>
      )}

      <p>${item.price.toFixed(2)}</p>

      <button onClick={() => onAddToCart(item)}>
        Add to Cart
      </button>
    </div>
  );
}

export default MenuItem;
