
import Menu from "../components/Menu";

function MenuPage({ onAddToCart }) {
  return (
    <div>
      <Menu onAddToCart={onAddToCart} />
    </div>
  );
}

export default MenuPage;
