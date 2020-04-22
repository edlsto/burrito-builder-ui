import React, { Component } from "react";
import "./Orders.css";
import { connect } from "react-redux";
import { setOrders, deleteOrder } from "../../actions";
import { getOrders, removeOrder } from "../../apiCalls";

class Orders extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    getOrders()
      .then((data) => this.props.setOrders(data.orders))
      .catch((err) => console.error("Error fetching:", err));
  }

  handleDelete = async (id) => {
    try {
      const response = await removeOrder(id);
      if (response === 204) {
        this.props.deleteOrder(id);
      }
    } catch (e) {
      console.log(e.message);
    }
  };

  render() {
    const orderEls = this.props.orders.map((order) => {
      return (
        <div key={order.id} className="order">
          <h3>{order.name}</h3>
          <ul className="ingredient-list">
            {order.ingredients.map((ingredient, i) => {
              return <li key={i}>{ingredient}</li>;
            })}
          </ul>
          <button onClick={() => this.handleDelete(order.id)}>Delete</button>
        </div>
      );
    });
    return (
      <section>{orderEls.length ? orderEls : <p>No orders yet!</p>}</section>
    );
  }
}

const mapStateToProps = ({ orders }) => ({
  orders,
});

const mapDispatchToProps = (dispatch) => ({
  setOrders: (orders) => dispatch(setOrders(orders)),
  deleteOrder: (id) => dispatch(deleteOrder(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Orders);
