import React from "react";
import "./App.css";
import { GET_PRODUCTS } from "./graphql/queries";
import { useQuery } from "@apollo/client";
import { Products } from "./graphql/generated-types";
import InventoryList from './InventoryList';

function App() {
  const { data } = useQuery<Products>(GET_PRODUCTS);

  return (
    <div className="App">
      <header className="App-header">
        Keeps Inventory
      </header>
      {data && <InventoryList data={data}/>}
    </div>
  );
}

export default App;
