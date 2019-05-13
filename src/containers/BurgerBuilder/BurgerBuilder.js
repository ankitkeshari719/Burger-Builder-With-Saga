import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";
import { withErrorHandler } from "../../hoc";
import {
  Burger,
  BuildControls,
  Modal,
  OrderSummary,
  Spinner
} from "../../components";
import {
  initIngredients,
  addIngredient,
  removeIngredient,
  purchaseInit
} from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    ordered: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  // Function to check where the burger is purchasable or not
  updatePurchasable(ingredients) {
    const sum = Object.keys(ingredients)
      .map(igKey => {
        return ingredients[igKey];
      })
      .reduce((prev, curr) => {
        return prev + curr;
      }, 0);
    return sum > 0;
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
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    let disabledInfo = { ...this.props.ings };
    let orderSummary = null;
    let burger = this.props.error ? (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Ingredients can't be loaded!
      </p>
    ) : (
      <Spinner />
    );

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (this.props.ings) {
      orderSummary = (
        <OrderSummary
          ingredients={this.props.ings}
          totalPrice={this.props.price}
          orderCanceled={this.orderCanceleHandler}
          orderContinued={this.orderContinueHandler}
        />
      );

      burger = (
        <>
          <Burger ingredients={this.props.ings} />
          <BuildControls
            ingredientAdded={this.props.onAddIngredient}
            ingredientRemove={this.props.onRemoveIngredient}
            totalPrice={this.props.price}
            disabledInfoRef={disabledInfo}
            purchasable={this.updatePurchasable(this.props.ings)}
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

const mapStateToProps = state => {
  return {
    ings: state.burgerReducr.ingredients,
    price: state.burgerReducr.totalPrice,
    error: state.burgerReducr.error
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onAddIngredient: ingName => dispatch(addIngredient(ingName)),
    onRemoveIngredient: ingName => dispatch(removeIngredient(ingName)),
    onInitIngredients: () => dispatch(initIngredients()),
    onInitPurchase: () => dispatch(purchaseInit())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
