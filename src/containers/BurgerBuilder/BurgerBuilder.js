import React, { Component } from "react";
import { Burger, BuildControls, Modal, OrderSummary } from "../../components";

const INGREDIENT_PRICE = {
  salad: 0.5,
  cheese: 0.4,
  meat: 1.3,
  bacon: 0.7
};

class BurgerBuilder extends Component {
  state = {
    ingredients: {
      salad: 0,
      bacon: 0,
      cheese: 0,
      meat: 0
    },
    totalPrice: 4,
    purchasable: false,
    ordered: false
  };

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
    console.log("Continue Order");
  };

  render() {
    let disabledInfo = { ...this.state.ingredients };
    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }
    return (
      <>
        <Modal
          show={this.state.ordered}
          orderCanceled={this.orderCanceleHandler}
        >
          <OrderSummary
            ingredients={this.state.ingredients}
            totalPrice={this.state.totalPrice}
            orderCanceled={this.orderCanceleHandler}
            orderContinued={this.orderContinueHandler}
          />
        </Modal>
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
}

export default BurgerBuilder;
