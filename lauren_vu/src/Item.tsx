import React from "react";

// individual item in a list
// also has delete button

interface ItemProps {
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

/*
amountType: "count"
description: "Consectetur adipiscing elit, sed do eiusmod tempor"
dosageValue: 1
drugType: "finasteride"
id: "1"
imageUrl: "https://via.placeholder.com/300.png/09f/fff"
name: "Finasteride"
price: 75
supplyInDays: 90
__typename: "Product"
*/

export const Item = (props: ItemProps) => {
  const {amountType, description, dosageValue, drugType, id, imageUrl, name, price, supplyInDays, __typename: type} = props;

  return (
    <>
      <td>{type}</td>
      <td>{name}</td>
      <td>{drugType}</td>
      <td>{id}</td>
      <td>{amountType}</td>
      <td>{dosageValue}</td>
      <td>{price}</td>
      <td>{supplyInDays}</td>
      <td><img src={imageUrl} alt={`${name}`} /></td>
      <td>{description}</td>
    </>
  );
}

export default Item;