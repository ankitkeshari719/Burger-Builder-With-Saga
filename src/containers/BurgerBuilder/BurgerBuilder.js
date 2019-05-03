import React, { Component } from "react";
import {
  Burger,
  BuildControls,
  Modal,
  OrderSummary,
  Spinner
} from "../../components";
import axios from "../../axios";
import { withErrorHandler } from "../../hoc";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    purchasable: false,
    ordered: false,
    isLoading: false,
    error: false
  };

  componentDidMount() {
    axios
      .get("/ingredients.json")
      .then(response => {
        this.setState({ ingredients: response.data });
      })
      .catch(error => {
        this.setState({ error: true });
      });
  }

  // Function to add ingredients
  addIngredientHandler = type => {
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = this.state.ingredients[type] + 1;
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICE[type]
    });
    this.updatePurchasable(updatedIngredient);
  };

  // Function to remove ingredient
  removeIngredientHandler = type => {
    const updatedIngredient = { ...this.state.ingredients };
    updatedIngredient[type] = this.state.ingredients[type] - 1;
    this.setState({
      ingredients: updatedIngredient,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICE[type]
    });
    this.updatePurchasable(updatedIngredient);
  };

  // Function to check where the burger is purchasable or not
  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    this.setState({ purchasable: sum > 0 });
  }

  // Function to handle the order of Burger
  orderBurgerHandler = () => {
    this.setState({ ordered: true });
  };

  // Order cancle Handler
  orderCanceleHandler = () => {
    this.setState({ ordered: false });
  };

  // Order continue Handler
  orderContinueHandler = () => {
    const queryParams = [];
    for (let i in this.state.ingredients) {
      queryParams.push(
        encodeURIComponent(i) +
          "=" +
          encodeURIComponent(this.state.ingredients[i])
      );
    }
    queryParams.push("price=" + this.state.totalPrice);

    const queryString = queryParams.join("&");
    this.props.history.push({
      pathname: "/checkout",
      search: "?" + queryString
    });
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    let orderSummary = null;
    let burger = this.state.error ? (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Ingredients can't be loaded!
      </p>
    ) : (
      <Spinner />
    );

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.state.ingredients) {
      orderSummary = this.state.isLoading ? (
        <Spinner />
      ) : (
        <OrderSummary
          ingredients={this.state.ingredients}
          totalPrice={this.state.totalPrice}
          orderCanceled={this.orderCanceleHandler}
          orderContinued={this.orderContinueHandler}
        />
      );

      burger = (
        <>
          <Burger ingredients={this.state.ingredients} />
          <BuildControls
            ingredientAdded={this.addIngredientHandler}
            ingredientRemove={this.removeIngredientHandler}
            totalPrice={this.state.totalPrice}
            disabledInfoRef={disabledInfo}
            purchasable={this.state.purchasable}
            orderBurger={this.orderBurgerHandler}
          />
        </>
      );
    }

    return (
      <>
        <Modal
          show={this.state.ordered}
          orderCanceled={this.orderCanceleHandler}
        >
          {orderSummary}
        </Modal>
        {burger}
      </>
    );
  }
}

export default withErrorHandler(BurgerBuilder, axios);
