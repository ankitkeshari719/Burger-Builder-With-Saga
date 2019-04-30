import React from "react";
import PropTypes from "prop-types";

import Button from "../../UI/Button/Button";

const orderSummary = props => {
  const styleKey = { textTransForm: "capitalize" };
  const ingredientSummary = Object.keys(props.ingredients).map(igKey => {
    return (
      <li key={igKey}>
        <span style={styleKey}>{igKey} </span>: {props.ingredients[igKey]}
      </li>
    );
  });

  return (
    <>
      <h3>Your Order</h3>
      <p>A delicious burger with the following ingredients:</p>
      <ul>{ingredientSummary}</ul>
      <p>
        <strong>Total Price: {props.totalPrice.toFixed(2)}</strong>
      </p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={props.orderCanceled}>
        CANCLE
      </Button>
      <Button btnType="Success" clicked={props.orderContinued}>
        CONTINUE
      </Button>
    </>
  );
};

orderSummary.propTypes = {
  ingredients: PropTypes.object,
  totalPrice: PropTypes.number,
  orderCanceled: PropTypes.func,
  orderContinued: PropTypes.func
};

export default orderSummary;
