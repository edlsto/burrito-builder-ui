export const setOrders = (orders) => ({
  type: "SET_ORDERS",
  orders,
});

export const addOrder = (order) => ({
  type: "ADD_ORDER",
  order,
});

export const deleteOrder = (id) => ({
  type: "DELETE_ORDER",
  id,
});
