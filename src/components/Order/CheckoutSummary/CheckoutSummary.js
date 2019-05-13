import React from "react";
import { connect } from "react-redux";
import Burger from "../../Burger/Burger";
import Button from "../../UI/Button/Button";
import classes from "./CheckoutSummary.css";

const checkoutSummary = props => {
  return (
    <div className={classes.CheckoutSummary}>
      <h1>We hope it tastes well!</h1>
      <div style={{ width: "100%", margin: "auto" }}>
        <Burger ingredients={props.ings} />
      </div>
      <Button btnType="Danger" clicked={props.checkoutCancelled}>
        CANCEL
      </Button>
      <Button btnType="Success" clicked={props.checkoutContined}>
        CONTINUE
      </Button>
    </div>
  );
};

const mapStateToProps = state => {
  return {
    ings: state.burgerReducr.ingredients
  };
};

export default connect(mapStateToProps)(checkoutSummary);
