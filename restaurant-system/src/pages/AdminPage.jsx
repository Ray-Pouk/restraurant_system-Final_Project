import { useState } from "react";
import AdminMenu from "../components/admin/AdminMenu";
import AdminOrders from "../components/admin/AdminOrders";
import AdminAnalytics from "../components/admin/AdminAnalytics";
import AdminReservations from "../components/admin/AdminReservations";
import { useRestaurant } from "../context/RestaurantContext";

function AdminPage() {
  const { orders, reservations } = useRestaurant();
  const [tab, setTab] = useState("orders");

  const pendingOrders = orders.filter((o) => o.status === "Pending").length;
  const pendingReservations = reservations.filter(
    (r) => r.status === "Pending"
  ).length;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>
        {pendingOrders} pending order{pendingOrders === 1 ? "" : "s"} ·{" "}
        {pendingReservations} reservation
        {pendingReservations === 1 ? "" : "s"} awaiting approval
      </p>

      <div className="admin-tabs">
        <button onClick={() => setTab("orders")} disabled={tab === "orders"}>
          Orders ({orders.length})
        </button>
        <button
          onClick={() => setTab("reservations")}
          disabled={tab === "reservations"}
        >
          Reservations ({reservations.length})
        </button>
        <button onClick={() => setTab("menu")} disabled={tab === "menu"}>
          Menu
        </button>
        <button
          onClick={() => setTab("analytics")}
          disabled={tab === "analytics"}
        >
          Analytics
        </button>
      </div>

      {tab === "orders" && <AdminOrders />}
      {tab === "reservations" && <AdminReservations />}
      {tab === "menu" && <AdminMenu />}
      {tab === "analytics" && <AdminAnalytics />}
    </div>
  );
}

export default AdminPage;
