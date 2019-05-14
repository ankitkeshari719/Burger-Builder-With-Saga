import React from "react";
import PropTypes from "prop-types";

import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const buildControls = props => {
  const controls = [
    { label: "Meat", type: "meat" },
    { label: "Cheese", type: "cheese" },
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" }
  ];

  let ingredientBuildControls = controls.map(ctrl => (
    <BuildControl
      key={ctrl.label}
      label={ctrl.label}
      addIngredient={() => props.ingredientAdded(ctrl.type)}
      removeIngredient={() => props.ingredientRemove(ctrl.type)}
      disabled={props.disabledInfoRef[ctrl.type]}
    />
  ));

  return (
    <div className={classes.BuildControls}>
      <p>
        Current Price: <strong>{props.totalPrice.toFixed(2)}</strong>
      </p>
      {ingredientBuildControls}

      <button
        className={classes.OrderButton}
        disabled={!props.purchasable}
        onClick={props.orderBurger}
      >
        {props.isAuthenticated? "ORDER NOW" : "SIGN IN TO ORDER"}
      </button>
    </div>
  );
};

buildControls.propTypes = {
  disabledInfoRef: PropTypes.object,
  totalPrice: PropTypes.number,
  ingredientAdded: PropTypes.func,
  ingredientRemove: PropTypes.func,
  purchasable: PropTypes.bool,
  orderBurger: PropTypes.func
};

export default buildControls;
