import * as actionTypes from "../actionTypes/actionTypes";
import axios from "../../axios";

/**
 * Action to add ingredient
 * @param  ingName {Object}
 * @return
 */
export const addIngredient = ingName => {
  return {
    type: actionTypes.ADD_INGREDIENT,
    ingredientName: ingName
  };
};

/**
 * Action to remove ingredient
 * @param  ingName {Object}
 * @return
 */
export const removeIngredient = ingName => {
  return {
    type: actionTypes.REMOVE_INGREDIENT,
    ingredientName: ingName
  };
};

/**
 * Action to fetch ingredient from server
 * @return
 */
export const initIngredients = () => {
  return dispatch => {
    dispatch(fetchIngredientsBegin());
    axios
      .get("/ingredients.json")
      .then(response => {
        dispatch(fectchIngredientsSuccess(response.data));
      })
      .catch(error => {
        dispatch(fetchIngredientsFailed(error));
      });
  };
};

function fetchIngredientsBegin() {
  return {
    type: actionTypes.FETCH_INGREDIENT_BEGIN
  };
}

function fectchIngredientsSuccess(ingredients) {
  return {
    type: actionTypes.FETCH_INGREDIENT_SUCCESS,
    ingredients: ingredients
  };
}

function fetchIngredientsFailed(error) {
  return {
    type: actionTypes.FETCH_INGREDIENT_FAILED,
    error: { error }
  };
}
