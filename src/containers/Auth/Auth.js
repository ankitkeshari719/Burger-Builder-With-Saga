import React, { Component } from "react";
import { connect } from "react-redux";
import { Button, Input } from "../../components";
import classes from "./Auth.css";
import { auth } from "../../store/actions";

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
    }
  };

  inputChangedHandler = (event, controlName) => {
    const updatedControls = {
      ...this.state.controls,
      [controlName]: {
        ...this.state.controls[controlName],
        value: event.target.value,
        valid: this.checkValidity(
          event.target.value,
          this.state.controls[controlName].validation
        ),
        touched: true
      }
    };

    this.setState({ controls: updatedControls });
  };

  checkValidity(value, rules) {
    let isValid = true;

    if (!rules) {
      return true;
    }
    if (rules.required) {
      isValid = rules.required && value.trim() !== "" && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLenght) {
      isValid = value.length <= rules.maxLenght && isValid;
    }

    if (rules.email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(String(value).toLowerCase());
    }

    if (rules.isNumeric) {
      const pattern = /^\d+$/;
      isValid = pattern.test(value) && isValid;
    }

    return isValid;
  }

  submitHandler = event => {
    event.preventDefault();
    this.props.onAuth(
      this.state.controls.email.value,
      this.state.controls.password.value
    );
  };

  render() {
    let FormElementsArray = [];
    for (let key in this.state.controls) {
      FormElementsArray.push({ id: key, config: this.state.controls[key] });
    }

    let formElements = FormElementsArray.map(formElement => (
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
    ));

    return (
      <div className={classes.Auth}>
        <form onSubmit={this.submitHandler}>
          {formElements}
          <Button btnType="Success">SUBMIT</Button>
        </form>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password) => dispatch(auth(email, password))
  };
};

export default connect(
  null,
  mapDispatchToProps
)(Auth);
