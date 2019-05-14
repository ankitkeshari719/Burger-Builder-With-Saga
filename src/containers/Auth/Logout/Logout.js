import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { logout } from "../../../store/actions";

class Logout extends Component {
  componentDidMount() {
    this.props.logout();
  }
  render() {
    return <Redirect to="/" />;
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
};

export default connect(
  null,
  mapDispatchToProps
)(Logout);
