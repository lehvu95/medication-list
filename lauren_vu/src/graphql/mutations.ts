import { gql } from "@apollo/client";

export const ADD_PRODUCT = gql`
  mutation AddProduct($payload: ProductInput!) {
    addProduct(payload: $payload) {
      id
      name
      imageUrl
      drugType
      amountType
      description
      price
      dosageValue
      supplyInDays
    }
  }
`;
