import React from "react";
import PropTypes from "prop-types";

import classes from "./BuildControl.css";

const buildControl = props => (
  <div className={classes.BuildControl}>
    <div className={classes.Label}>{props.label}</div>
    <button
      className={classes.Less}
      onClick={props.removeIngredient}
      disabled={props.disabled}
    >
      Less
    </button>
    <button className={classes.More} onClick={props.addIngredient}>
      More
    </button>
  </div>
);

buildControl.propTypes = {
  label: PropTypes.string,
  removeIngredient: PropTypes.func,
  addIngredient: PropTypes.func,
  disabled: PropTypes.bool
};

export default buildControl;
