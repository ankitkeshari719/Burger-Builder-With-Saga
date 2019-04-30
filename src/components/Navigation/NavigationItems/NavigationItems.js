import React from "react";

import classes from "./NavigationItems.css";
import NavigationItem from "./NavigationItem/NavigationItem";

const navigationItems = props => (
  <ul className={classes.NavigationItems}>
    <NavigationItem>Burger Builder</NavigationItem>
    <NavigationItem>Orders</NavigationItem>
  </ul>
);

export default navigationItems;
