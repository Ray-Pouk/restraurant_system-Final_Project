import { useState } from "react";
import MenuItemForm from "./MenuItemForm";
import { useRestaurant } from "../../context/RestaurantContext";

function AdminMenu() {
  const { menu, addMenuItem, updateMenuItem, deleteMenuItem } =
    useRestaurant();
  const [editingId, setEditingId] = useState(null);

  function handleDelete(item) {
    if (window.confirm(`Delete "${item.name}" from the menu?`)) {
      deleteMenuItem(item.id);
    }
  }

  return (
    <div>
      <h2>Manage Menu</h2>

      <h3>Add New Item</h3>
      <MenuItemForm submitLabel="Add Item" onSubmit={addMenuItem} />

      <h3>Current Menu ({menu.length} items)</h3>

      {menu.map((item) => (
        <div key={item.id} className="card">
          {editingId === item.id ? (
            <MenuItemForm
              initialValues={item}
              submitLabel="Save Changes"
              onSubmit={(changes) => {
                updateMenuItem(item.id, changes);
                setEditingId(null);
              }}
              onCancel={() => setEditingId(null)}
            />
          ) : (
            <>
              <h4>
                {item.name} - ${item.price.toFixed(2)} ({item.category})
                {item.isSpecial && " ⭐"}
                {item.popular && " 🔥"}
              </h4>
              <p>{item.description}</p>
              {item.dietary.length > 0 && (
                <p>Dietary: {item.dietary.join(", ")}</p>
              )}
              <p>
                Availability:{" "}
                <strong>{item.available ? "Available" : "Sold out"}</strong>
              </p>

              <button
                onClick={() =>
                  updateMenuItem(item.id, { available: !item.available })
                }
              >
                {item.available ? "Mark Sold Out" : "Mark Available"}
              </button>
              <button onClick={() => setEditingId(item.id)}>Edit</button>
              <button onClick={() => handleDelete(item)}>Delete</button>
            </>
          )}
          <hr />
        </div>
      ))}
    </div>
  );
}

export default AdminMenu;
