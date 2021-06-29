

/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: AddProduct
// ====================================================

export interface AddProduct_addProduct {
  id: string;
  name: string;
  imageUrl: string;
  drugType: string;
  amountType: string;
  description: string;
  price: number;
  dosageValue: number;
  supplyInDays: number;
}

export interface AddProduct {
  addProduct: AddProduct_addProduct[];
}

export interface AddProductVariables {
  payload: ProductInput;
}


/* tslint:disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Products
// ====================================================

export interface Products_products {
  id: string;
  name: string;
  imageUrl: string;
  drugType: string;
  amountType: string;
  description: string;
  price: number;
  dosageValue: number;
  supplyInDays: number;
}

export interface Products {
  products: Products_products[];
}

/* tslint:disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

// null
export interface ProductInput {
  name: string;
  imageUrl: string;
  drugType: string;
  amountType: string;
  description: string;
  price: number;
  dosageValue: number;
  supplyInDays: number;
}

//==============================================================
// END Enums and Input Objects
//==============================================================