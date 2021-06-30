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
  if (event.reset) {
    return {
      amountType: '',
      description: '',
      dosageValue: 0,
      drugType: '',
      id: '',
      imageUrl: '',
      name: '',
      price: 0,
      supplyInDays: 0,
      __typename: '',
    };
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
  const [newItem, setNewItem] = useReducer(itemReducer, {
      amountType: '',
      description: '',
      dosageValue: 0,
      drugType: '',
      id: '',
      imageUrl: '',
      name: '',
      price: 0,
      supplyInDays: 0,
      __typename: '',
    }
  );

  useEffect(() => {
    setNewItem({
      amountType: '',
      description: '',
      dosageValue: 0,
      drugType: '',
      id: '',
      imageUrl: '',
      name: '',
      price: 0,
      supplyInDays: 0,
      __typename: '',
    });
  }, [inventory]);

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

  const handleSubmit = (event: any) => {
    event.preventDefault();
    addItem(newItem);
    setNewItem({reset: true});
  }

  const getDisableButton = () => {
    const {__typename, name, drugType, id, amountType, dosageValue, price, supplyInDays, imageUrl, description} = newItem;
    return __typename === '' ||
      name === '' ||
      drugType === '' ||
      id === '' ||
      amountType === '' ||
      (dosageValue && dosageValue <= 0) ||
      (price && price  <= 0) ||
      (supplyInDays && supplyInDays <= 0) ||
      imageUrl === '' ||
      description === '';
  }

  const renderAddItem = () => {
    const {__typename, name, drugType, id, amountType, dosageValue, price, supplyInDays, imageUrl, description} = newItem;
    const shouldDisable = getDisableButton();
    return (
      <form onSubmit={handleSubmit}>
        <fieldset>
          <table>
          <tr>
            <th>Type<input type="text" name="__typename" onChange={handleChange} placeholder="Type" value={__typename || ''}/></th>
            <th>Name<input type="text" name="name" onChange={handleChange} placeholder="Name" value={name || ''}/></th>
            <th>Drug<input type="text" name="drugType" onChange={handleChange} placeholder="Drug Type" value={drugType || ''}/></th>
            <th>ID<input type="text" name="id" onChange={handleChange} placeholder="ID" value={id || ''}/></th>
            <th>Amount<input type="text" name="amountType" onChange={handleChange} placeholder="Amount Type" value={amountType || ''}/></th>
            <th>Dosage<input type="text" name="dosageValue" onChange={handleChange} placeholder="Dosage" value={dosageValue || ''}/></th>
            <th>Price<input type="text" name="price" onChange={handleChange} placeholder="Price" value={price || ''}/></th>
            <th>Supply in Days<input type="text" name="supplyInDays" onChange={handleChange} placeholder="Supply in Days" value={supplyInDays || ''}/></th>
            <th>Image<input type="text" name="imageUrl" onChange={handleChange} placeholder="Image URL" value={imageUrl || ''}/></th>
            <th>Description<input type="text" name="description" onChange={handleChange} placeholder="Description" value={description || ''}/></th>
            <th><button type='submit' disabled={shouldDisable}>Add Item</button></th>
          </tr>
          </table>
        </fieldset>
      </form>
    )
  }

  return (
    <div>
        {renderAddItem()}
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