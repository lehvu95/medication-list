import React, {useEffect, useState, useReducer} from "react";
import Item from './Item';

// display inventory list

interface Items {
  amountType?: string;
  description?: string;
  dosageValue?: number;
  drugType?: string;
  id?: string;
  imageUrl?: string;
  name?: string;
  price?: number;
  supplyInDays?: number;
  __typename?: string;
}

interface InventoryListProps {
  data: {
    products: Items[];
  }
}

const itemReducer = (state: Items, event: any) => {
  if (event.rest) {
    return {}
  }
  return {
    ...state,
    [event.name]: event.value,
  }
}

export const InventoryList = (props: InventoryListProps) => {
  const {data: {products}} = props;

  const [inventory, updateInventory] = useState(products);
  const [lastDeleted, updateLastDeleted] = useState({});
  const [lastAdded, updateLastAdded] = useState({});
  const [newItem, setNewItem] = useReducer(itemReducer, {});

  useEffect(() => {
    setNewItem({})
  }, [inventory]);

  //console.log('newItem:', newItem)
  
  const showUndoDelete = JSON.stringify(lastDeleted) !== JSON.stringify({});
  const showUndoAdd = JSON.stringify(lastAdded) !== JSON.stringify({});

  const removeItem = (item: Items, undo = false) => {
    const newData = products.filter((oldItem) => {
      return JSON.stringify(oldItem) !== JSON.stringify(item);
    });
    updateInventory(newData);
    if (undo) {
      updateLastAdded({});
    } else {
      updateLastDeleted(item);
    }
  };

  const addItem = (item: Items, undo = false) => {
    const newData = inventory.concat([item]);
    updateInventory(newData);
    if (undo) {
      updateLastDeleted({});
    } else {
      updateLastAdded(item);
    }
  };

  const handleChange = (event: any) => {
    setNewItem({
      name: event.target.name,
      value: event.target.value,
    });
  };

  const handleSubmit = (item: Items) => {
    addItem(item);
  }

  const renderAddItem = () => {
    return (
      <tr>
        <td><fieldset><input type="text" name="__typename" onChange={handleChange} placeholder="Type" /></fieldset></td>
        <td><fieldset><input type="text" name="name" onChange={handleChange} placeholder="Name" /></fieldset></td>
        <td><fieldset><input type="text" name="drugType" onChange={handleChange} placeholder="Drug Type" /></fieldset></td>
        <td><fieldset><input type="text" name="id" onChange={handleChange} placeholder="ID" /></fieldset></td>
        <td><fieldset><input type="text" name="amountType" onChange={handleChange} placeholder="Amount Type" /></fieldset></td>
        <td><fieldset><input type="text" name="dosageValue" onChange={handleChange} placeholder="Dosage" /></fieldset></td>
        <td><fieldset><input type="text" name="price" onChange={handleChange} placeholder="Price" /></fieldset></td>
        <td><fieldset><input type="text" name="supplyInDays" onChange={handleChange} placeholder="Supply in Days" /></fieldset></td>
        <td><fieldset><input type="text" name="imageUrl" onChange={handleChange} placeholder="Image URL" /></fieldset></td>
        <td><fieldset><input type="text" name="description" onChange={handleChange} placeholder="Description" /></fieldset></td>
        <td><button onClick={() => handleSubmit(newItem)}>Add Item</button></td>
      </tr>
    )
  }

  return (
    <div>
      <table>
        <tr>
          <th>Type</th>
          <th>Name</th>
          <th>Drug Type</th>
          <th>ID</th>
          <th>Amount Type</th>
          <th>Dosage</th>
          <th>Price</th>
          <th>Supply in Days</th>
          <th>Image</th>
          <th>Description</th>
          <th>
            {showUndoDelete && <button onClick={() => {addItem(lastDeleted, true)}}>Undo Delete</button>}
            {showUndoAdd && <button onClick={() => {removeItem(lastDeleted, true)}}>Undo Add</button>}
          </th>
        </tr>
        {renderAddItem()}
        {inventory && inventory.map((product) =>
          <tr>
            <Item 
              amountType={product.amountType}
              description={product.description}
              dosageValue={product.dosageValue}
              drugType={product.drugType}
              id={product.id}
              imageUrl={product.imageUrl}
              name={product.name}
              price={product.price}
              supplyInDays={product.supplyInDays}
              __typename={product.__typename}
            />
            <td><button onClick={() => {removeItem(product)}}>Delete</button></td>
          </tr>
        )}
      </table>
    </div>
  );
}

export default InventoryList;