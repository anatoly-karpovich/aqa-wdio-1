export interface IProduct {
  name: string;
  price: number;
  amount: number;
  notes?: string;
  manufacturer: string;
}

export interface IProductResponse extends IProduct {
  _id: string;
  createdOn: string;
}
