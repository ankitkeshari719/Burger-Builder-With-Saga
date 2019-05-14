import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Redirect } from "react-router-dom";
import { Button, Input, Spinner } from "../../components";
import classes from "./Auth.css";
import { auth, setAuthRedirectPath } from "../../store/actions";
import { updateObject, checkValidity } from "../../shared";

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: "input",
        elementConfig: {
          name: "email",
          type: "email",
          placeholder: "Your E-mail"
        },
        value: "",
        validation: {
          required: true,
          email: true
        },
        valid: false,
        touched: false
      },
      password: {
        elementType: "input",
        elementConfig: {
          name: "password",
          type: "password",
          placeholder: "Your Password"
        },
        value: "",
        validation: {
          required: true,
          minLength: 6
        },
        valid: false,
        touched: false
      }
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== "/") {
      this.props.onSetRedirectPath("/");
    }
  }

  inputChangedHandler = (event, controlName) => {
    const updatedControls = updateObject(this.state.controls, {
      [controlName]: updateObject(this.state.controls[controlName], {
        value: event.target.value,
        valid: checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      })
    });
    this.setState({ controls: updatedControls });
  };

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value,
      this.state.isSignUp
    );
  };

  switchAuthMode = () => {
    this.setState(prevState => {
      return { isSignUp: !prevState.isSignUp };
    });
  };

  render() {
    const {
      isLoading,
      isError,
      isAuthenticated,
      authRedirectPath
    } = this.props;

    let FormElementsArray = [];
    for (let key in this.state.controls) {
      FormElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    let formElements = isLoading ? (
      <Spinner />
    ) : (
      FormElementsArray.map(formElement => (
        <Input
          key={formElement.id}
          elementType={formElement.config.elementType}
          elementConfig={formElement.config.elementConfig}
          value={formElement.config.value}
          changed={event => this.inputChangedHandler(event, formElement.id)}
          invalid={!formElement.config.valid}
          touched={formElement.config.touched}
          shouldValidate={formElement.config.validation}
        />
      ))
    );

    return (
      <div className={classes.Auth}>
        {isAuthenticated && <Redirect to={authRedirectPath} />}
        {isError && (
          <p style={{ textAlign: "center", color: "red" }}>{isError.message}</p>
        )}
        {this.state.isSignUp ? (
          <h2>Create an account</h2>
        ) : (
          <h2>Welcome to Burger King</h2>
        )}
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="Success">
            {this.state.isSignUp ? "Sign Up" : "Login"}
          </Button>
        </form>
        {this.state.isSignUp ? (
          <>
            Have already an account ?
            <Button btnType="Danger" clicked={this.switchAuthMode}>
              &nbsp;Login here
            </Button>
          </>
        ) : (
          <>
            Don't have an account?
            <Button btnType="Danger" clicked={this.switchAuthMode}>
              &nbsp;Sign Up
            </Button>
          </>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isLoading: state.authReducr.loading,
    isError: state.authReducr.error,
    isAuthenticated: state.authReducr.token !== null,
    buildingBurger: state.burgerReducr.building,
    authRedirectPath: state.authReducr.authRedirectPage
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    { onAuth: auth, onSetRedirectPath: setAuthRedirectPath },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Auth);
