import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { CheckoutSummary } from "../../components";
import ContactData from "./ContactData/ContactData";
class Checkout extends Component {

  checkoutCancelledHandler = () => {
    this.props.history.goBack();
  };

  checkoutContinedHandler = () => {
    this.props.history.replace("/checkout/contact-data");
  };

  render() {
    let summary = <Redirect to="/" />;
    if (this.props.ings) {
      const purchasedRedirect = this.props.purchased ? (
        <Redirect to="/" />
      ) : null;
      summary = (
        <>
          {purchasedRedirect}
          <CheckoutSummary
            checkoutCancelled={this.checkoutCancelledHandler}
            checkoutContined={this.checkoutContinedHandler}
          />
          <Route
            path={this.props.match.path + "/contact-data"}
            component={ContactData}
          />
        </>
      );
    }
    return summary;
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerReducr.ingredients,
    purchased: state.orderReducr.purchased
  };
};

export default connect(
  mapStateToProps
)(Checkout);
