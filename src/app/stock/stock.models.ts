export class Product {
  id: number;
  name: string;
  has_consignment: boolean;
  observation: string;
  is_active: boolean;
  price: string;
  amount: number;
  category: number;
  is_for_sale: boolean;
  created: string;

  constructor(productJson: any) {
    console.log(productJson);
    this.id = productJson.id;
    this.name = productJson.name;
    this.amount = productJson.amount;
    this.has_consignment = productJson.has_consignment;
    this.observation = productJson.observation;
    this.is_active = productJson.is_active;
    this.price = productJson.price;
    this.category = productJson.category;
    this.is_for_sale = productJson.is_for_sale;
    this.created = productJson.created;
  }
}