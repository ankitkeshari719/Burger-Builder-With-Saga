import React, { Component } from "react";
import axios from "../../axios";
import { connect } from "react-redux";
import { withErrorHandler } from "../../hoc";
import { bindActionCreators } from "redux";
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
  purchaseInit,
  setAuthRedirectPath
} from "../../store/actions";

class BurgerBuilder extends Component {
  state = {
    ordered: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  /**
   * Function to check where the burger is purchasable or not
   * @param  ingredients {array of object}
   * @return {boolean}
   */
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

  /**
   * Function to handle the order of Burger
   * @return
   */
  orderBurgerHandler = () => {
    if (this.props.isAuthenticated) {
      this.setState({ ordered: true });
    } else {
      this.props.onSetRedirectPath("/checkout");
      this.props.history.push("/auth");
    }
  };

  /**
   *Order cancle Handler
   * @return
   */
  orderCanceleHandler = () => {
    this.setState({ ordered: false });
  };

  /**
   *Order continue Handler
   * @return
   */
  orderContinueHandler = () => {
    this.props.onInitPurchase();
    this.props.history.push("/checkout");
  };

  render() {
    const {
      ings,
      price,
      isAuthenticated,
      error,
      onAddIngredient,
      onRemoveIngredient
    } = this.props;

    let disabledInfo = { ...ings };
    let orderSummary = null;
    let burger = error ? (
      <p style={{ textAlign: "center", fontWeight: "bold" }}>
        Ingredients can't be loaded!
      </p>
    ) : (
      <Spinner />
    );

    for (let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] <= 0;
    }

    if (ings) {
      orderSummary = (
        <OrderSummary
          ingredients={ings}
          totalPrice={price}
          orderCanceled={this.orderCanceleHandler}
          orderContinued={this.orderContinueHandler}
        />
      );

      burger = (
        <>
          <Burger ingredients={ings} />
          <BuildControls
            ingredientAdded={onAddIngredient}
            ingredientRemove={onRemoveIngredient}
            totalPrice={price}
            disabledInfoRef={disabledInfo}
            purchasable={this.updatePurchasable(ings)}
            orderBurger={this.orderBurgerHandler}
            isAuthenticated={isAuthenticated}
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
    error: state.burgerReducr.error,
    isAuthenticated: state.authReducr.token !== null
  };
};

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      onAddIngredient: addIngredient,
      onRemoveIngredient: removeIngredient,
      onInitIngredients: initIngredients,
      onInitPurchase: purchaseInit,
      onSetRedirectPath: setAuthRedirectPath
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
