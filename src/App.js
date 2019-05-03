import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "./components";
import { BurgerBuilder, Checkout, Orders } from "./containers";

function App() {
  return (
    <div>
      <Layout>
        <Switch>
          <Route path="/checkout" component={Checkout} />
          <Route path="/orders" component={Orders} />
          <Route path="/" exact component={BurgerBuilder} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
