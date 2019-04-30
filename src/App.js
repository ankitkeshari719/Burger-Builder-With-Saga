import React from "react";
import { Layout } from "./components";
import { BurgerBuilder } from "./containers";

function App() {
  return (
    <div>
      <Layout>
        <BurgerBuilder/>
      </Layout>
    </div>
  );
}

export default App;
