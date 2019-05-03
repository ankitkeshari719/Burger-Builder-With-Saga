import React, { Component } from "react";
import axios from "../../../axios";
import classes from "./ContactData.css";
import { Button, Spinner } from "../../../components";

class ContactData extends Component {
  state = {
    name: "",
    email: "",
    address: {
      street: "",
      city: "",
      zipcode: "",
      country: ""
    },
    isLoading: false
  };

  orderHandler = event => {
    event.preventDefault();
    this.setState({ isLoading: true });
    const order = {
      ingredients: this.props.ingredients,
      price: this.props.totalPrice,
      customer: {
        name: "Ankit",
        address: {
          street: "Test_Street",
          zipcode: "123456",
          country: "Test_Country",
          email: "Test@test.com"
        },
        deliveryMethod: "Test_Method"
      }
    };

    axios
      .post("/orders.json", order)
      .then(response => {
        this.setState({ isLoading: false });
        this.props.history.push("/");
      })
      .catch(error => {
        this.setState({ isLoading: false });
      });
  };

  render() {
    let form = this.state.isLoading ? (
      <Spinner />
    ) : (
      <form>
        <input type="text" name="name" placeholder="Enter your name." />
        <input type="email" name="email" placeholder="Enter your email." />
        <input type="text" name="street" placeholder="Enter your street." />
        <input type="text" name="city" placeholder="Enter your city." />
        <input type="text" name="zipcode" placeholder="Enter your zipcode." />
        <input type="text" name="country" placeholder="Enter your country." />
        <Button btnType="Success" clicked={this.orderHandler}>
          ORDER
        </Button>
      </form>
    );
    return (
      <div className={classes.ContactData}>
        <h1>Enter Your Contact Data</h1>
        {form}
      </div>
    );
  }
}

export default ContactData;
