import { CooperativeUser } from "../shared/models/cooperative-user.model";
export class Product {
  id: number;
  created: string;
  name: string;
  has_consignment: boolean;
  observation: string;
  is_active: boolean;
  price: string;
  category: number;
  is_for_sale: boolean;
  amount: number;

  constructor(productJson: any) {
    this.id = productJson.id;
    this.created = productJson.created;
    this.name = productJson.name;
    this.amount = productJson.amount;
    this.has_consignment = productJson.has_consignment;
    this.observation = productJson.observation;
    this.is_active = productJson.is_active;
    this.category = productJson.category;
    this.is_for_sale = productJson.is_for_sale;
    this.price = productJson.price;
  }
}

export class ProductEntry {
  id: number;
  created: string;
  observation: string;
  who_created: CooperativeUser;
  product: {
    id: number;
    name: string;
  };
  item_id: number;
}