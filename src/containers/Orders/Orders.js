import React, { Component } from "react";
import axios from "../../axios";
import { withErrorHandler } from "../../hoc";
import { Spinner, Order } from "../../components";
import { connect } from "react-redux";
import { fetchOrders } from "../../store/actions";

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token, this.props.userId);
  }
  render() {
    let orders = this.props.isLoading ? (
      <Spinner />
    ) : (
      this.props.orders.map(order => (
        <Order
          key={order.id}
          ingredients={order.ingredients}
          totalPrice={order.totalPrice}
        />
      ))
    );
    return orders;
  }
}

const mapStateToProps = state => {
  return {
    orders: state.orderReducr.orders,
    isLoading: state.orderReducr.loading,
    token: state.authReducr.token,
    userId: state.authReducr.userId
  };
};

const mapDisatchToProps = dispatch => {
  return {
    onFetchOrders: (token, userId) => dispatch(fetchOrders(token, userId))
  };
};

export default connect(
  mapStateToProps,
  mapDisatchToProps
)(withErrorHandler(Orders, axios));
