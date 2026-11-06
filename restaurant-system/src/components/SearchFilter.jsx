function SearchFilter({
  search,
  setSearch,
  category,
  setCategory,
  dietary,
  setDietary,
  price,
  setPrice,
}) {
  return (
    <div>
      <h2>Find Menu Items</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search menu..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {/* Category Filter */}
      <select
        value={category}
        onChange={(event) => setCategory(event.target.value)}
      >
        <option value="All">All Categories</option>
        <option value="Starters">Starters</option>
        <option value="Mains">Mains</option>
        <option value="Desserts">Desserts</option>
        <option value="Beverages">Beverages</option>
      </select>

      {/* Dietary Filter */}
      <select
        value={dietary}
        onChange={(event) => setDietary(event.target.value)}
      >
        <option value="All">All Dietary Options</option>
        <option value="Vegetarian">Vegetarian</option>
        <option value="Vegan">Vegan</option>
        <option value="Gluten-Free">Gluten-Free</option>
      </select>

       
{/* Price Filter */}
<select
  value={price}
  onChange={(event) => setPrice(event.target.value)}
>
  <option value="All">All Prices</option>
  <option value="Under10">Under $10</option>
  <option value="10to20">$10 - $20</option>
  <option value="Over20">Over $20</option>
</select>

    </div>
  );
}

export default SearchFilter;