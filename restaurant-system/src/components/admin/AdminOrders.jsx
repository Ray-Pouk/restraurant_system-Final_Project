import { useState } from "react";
import { useRestaurant } from "../../context/RestaurantContext";
import { ORDER_STATUSES } from "../../data/orderStatuses";

function AdminOrders() {
  const { orders, updateOrderStatus } = useRestaurant();
  const [filter, setFilter] = useState("All");

  // Newest first
  const visible = [...orders]
    .reverse()
    .filter((order) => filter === "All" || order.status === filter);

  return (
    <div>
      <h2>Manage Orders</h2>

      <label>Show: </label>
      <select value={filter} onChange={(event) => setFilter(event.target.value)}>
        <option value="All">All orders</option>
        {ORDER_STATUSES.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>

      {visible.length === 0 ? (
        <p>No orders to show.</p>
      ) : (
        visible.map((order) => {
          const subtotal = order.items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
          );

          return (
            <div key={order.orderNumber}>
              <h3>Order #{order.orderNumber}</h3>
              <p>
                {order.customerName} - {order.phone} - {order.orderType}
              </p>
              <p>{order.userId ? "Account order" : "Guest order"}</p>
              {order.orderType === "Delivery" && (
                <p>Address: {order.address}</p>
              )}

              {order.items.map((item) => (
                <p key={item.id}>
                  {item.name} x {item.quantity}
                </p>
              ))}

              <p>Total (incl. GST): ${(subtotal * 1.05).toFixed(2)}</p>

              <label>Status: </label>
              <select
                value={order.status}
                onChange={(event) =>
                  updateOrderStatus(order.orderNumber, event.target.value)
                }
              >
                {ORDER_STATUSES.map((status) => (
                  <option key={status} value={status}>
                    {status}
                  </option>
                ))}
              </select>
              <hr />
            </div>
          );
        })
      )}
    </div>
  );
}

export default AdminOrders;
