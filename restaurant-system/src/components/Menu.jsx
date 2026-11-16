
import { useState } from "react";
import MenuItem from "./MenuItem";
import SearchFilter from "./SearchFilter";
import { useRestaurant } from "../context/RestaurantContext";
import { useAuth } from "../context/AuthContext";

function Menu({ onAddToCart }) {
  const { user } = useAuth();
  const prefs = user?.preferences;

  // 1. State variables for searching and filtering
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState(prefs?.favoriteCategory ?? "All");
  const [dietary, setDietary] = useState(
    prefs && prefs.dietary !== "None" ? prefs.dietary : "All"
  );
  const [price, setPrice] = useState("All");

  // 2. Menu data comes from shared context (editable by admin later)
  const { menu } = useRestaurant();
  const menuItems = menu.filter((item) => item.available);

  // 3. Filter menu items
  const filteredItems = menuItems.filter((item) => {
    const matchesSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || item.category === category;

    const matchesDietary =
      dietary === "All" || item.dietary.includes(dietary);

const matchesPrice =
  price === "All" ||
  (price === "Under10" && item.price < 10) ||
  (price === "10to20" && item.price >= 10 && item.price <= 20) ||
  (price === "Over20" && item.price > 20);

    return matchesSearch && matchesCategory && matchesDietary && matchesPrice;
  });

  // 4. Display menu and filtered results
  return (
    <div>
      <h2>Our Menu</h2>

      <SearchFilter
  search={search}
  setSearch={setSearch}
  category={category}
  setCategory={setCategory}
  dietary={dietary}
  setDietary={setDietary}
  price={price}
  setPrice={setPrice}
/>

      {filteredItems.length > 0 ? (
        filteredItems.map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onAddToCart={onAddToCart}
          />
        ))
      ) : (
        <p>No menu items found.</p>
      )}
    </div>
  );
}

export default Menu;
