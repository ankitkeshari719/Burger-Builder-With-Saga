import React from "react";
import PropTypes from "prop-types";

import classes from "./Toolbar.css";
import NavigationItems from "../NavigationItems/NavigationItems";
import DrawerToggle from "../SideDrawer/DrawerToggle/DrawerToggle";
import Logo from "../../UI/Logo/Logo";

const toolbar = props => (
  <header className={classes.Toolbar}>
    <DrawerToggle clicked={props.drawerToggleClicked} />
    <div className={classes.Logo}>
      <Logo />
    </div>
    <nav className={classes.DesktopOnly}>
      <NavigationItems isAuthenticated={props.isAuthenticated} />
    </nav>
  </header>
);

toolbar.propTypes = {
  drawerToggleClicked: PropTypes.func
};

export default toolbar;
