import React from "react";
import classes from "./Order.css";

const order = props => {
    const ingredients = [];
    for (let ingredientsName in props.ingredients) {
        ingredients.push({
            name: ingredientsName,
            amount: props.ingredients[ingredientsName]
        });
    }

    const ingredientOutput = ingredients.map(ig => {
        return (
            <span
                key={ig.name}
                style={{
                    textTransform: "capitalize",
                    display: "inline-block",
                    margin: "0 8px",
                    boder: "1px solid #ccc",
                    padding: "5px"
                }}
            >
                {ig.name} ({ig.amount})
      </span>
        );
    });
    return (
        <div className={classes.Order}>
            <p>Ingredient: {ingredientOutput}</p>
            <p>
                Price: <strong>USD {Number(props.totalPrice).toFixed(2)}</strong>
            </p>
        </div>
    );
};

export default order;
