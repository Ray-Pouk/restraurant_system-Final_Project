import { createContext, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { initialMenu } from "../data/menuData";

const RestaurantContext = createContext(null);

export function RestaurantProvider({ children }) {
  const [menu, setMenu] = useLocalStorage("srms_menu_v2", initialMenu);
  const [orders, setOrders] = useLocalStorage("srms_orders", []);
  const [reservations, setReservations] = useLocalStorage(
    "srms_reservations",
    []
  );

  const [feedback, setFeedback] = useLocalStorage("srms_feedback", []);

  // ---- Menu ----
  function addMenuItem(item) {
    setMenu((current) => {
      const nextId = current.reduce((max, i) => Math.max(max, i.id), 0) + 1;
      return [...current, { available: true, ...item, id: nextId }];
    });
  }

  function updateMenuItem(id, changes) {
    setMenu((current) =>
      current.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );
  }

  function deleteMenuItem(id) {
    setMenu((current) => current.filter((item) => item.id !== id));
  }

  // ---- Orders ----
  function addOrder(newOrder) {
    const order = {
      ...newOrder,
      orderNumber: Date.now(),
      status: "Pending",
      createdAt: new Date().toISOString(),
    };
    setOrders((current) => [...current, order]);
    return order;
  }

  function updateOrderStatus(orderNumber, status) {
    setOrders((current) =>
      current.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
  }

  // ---- Reservations ----
  function addReservation(data) {
    const reservation = {
      ...data,
      id: Date.now(),
      status: "Pending",
    };
    setReservations((current) => [...current, reservation]);
    return reservation;
  }

  function updateReservation(id, changes) {
    setReservations((current) =>
      current.map((r) => (r.id === id ? { ...r, ...changes } : r))
    );
  }

  function cancelReservation(id) {
    updateReservation(id, { status: "Cancelled" });
  }

  // ---- Feedback (one entry per order) ----
  function addFeedback(data) {
    const entry = { ...data, id: Date.now(), createdAt: new Date().toISOString() };
    setFeedback((current) => [...current, entry]);
    return entry;
  }

  const value = {
    menu,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem,
    orders,
    addOrder,
    updateOrderStatus,
    reservations,
    addReservation,
    updateReservation,
    cancelReservation,
    feedback,
    addFeedback,
  };

  return (
    <RestaurantContext.Provider value={value}>
      {children}
    </RestaurantContext.Provider>
  );
}

export function useRestaurant() {
  const context = useContext(RestaurantContext);
  if (!context) {
    throw new Error("useRestaurant must be used inside RestaurantProvider");
  }
  return context;
}
