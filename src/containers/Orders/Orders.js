import React, { Component } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios";
import { withErrorHandler } from "../../hoc";
import { Spinner } from "../../components";
import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onfetchOrders();
  }
  render() {
    let orders = this.props.isLoading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
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

const mapStateToProps = state => {
  return {
    orders: state.orderReducr.orders,
    isLoading: state.orderReducr.loading
  };
};

const mapDisatchToProps = dispatch => {
  return {
    onfetchOrders: () => dispatch(fetchOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDisatchToProps
)(withErrorHandler(Orders, axios));
