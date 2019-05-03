import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import { withErrorHandler } from "../../hoc";
import { Spinner } from "../../components";

class Orders extends Component {
  state = {
    orders: [],
    isLoading: true
  };
  componentDidMount() {
    axios
      .get("/orders.json")
      .then(response => {
        const fetchedOrders = [];
        for (let key in response.data) {
          fetchedOrders.push({ ...response.data[key], id: key });
        }
        this.setState({ isLoading: false, orders: fetchedOrders });
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  }
  render() {
    let orders = this.state.isLoading ? (
      <Spinner />
    ) : (
      this.state.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={order.price}
        />
      ))
    );
    return orders;
  }
}

export default withErrorHandler(Orders, axios);
