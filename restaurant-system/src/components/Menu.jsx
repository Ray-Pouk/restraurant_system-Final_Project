
import { useState } from "react";
import MenuItem from "./MenuItem";
import SearchFilter from "./SearchFilter";

function Menu({ onAddToCart }) {
  // 1. State variables for searching and filtering
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [dietary, setDietary] = useState("All");
  const [price, setPrice] = useState("All");

  // 2. Menu data
  const menuItems = [
    {
      id: 1,
      name: "Chicken Wings",
      category: "Starters",
      description: "Crispy chicken wings",
      ingredients: "Chicken, seasoning, sauce",
      price: 15.99,
      dietary: ["Gluten-Free"],
    },
    {
      id: 2,
      name: "Cheeseburger",
      category: "Mains",
      description: "Beef burger with cheese",
      ingredients: "Beef, cheese, lettuce, tomato",
      price: 18.99,
      dietary: [],
    },
    {
      id: 3,
      name: "Vegetable Salad",
      category: "Starters",
      description: "Fresh vegetable salad",
      ingredients: "Lettuce, tomato, cucumber",
      price: 9.99,
      dietary: ["Vegetarian", "Vegan", "Gluten-Free"],
    },
    {
      id: 4,
      name: "Chocolate Cake",
      category: "Desserts",
      description: "Rich chocolate cake",
      ingredients: "Chocolate, flour, sugar",
      price: 7.99,
      dietary: ["Vegetarian"],
    },
  ];

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
