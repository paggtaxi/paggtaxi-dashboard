export class Product {
  id: number;
  name: string;
  hasConsignment: boolean;
  observation: string;
  isActive: boolean;
  price: string;
  category: number;
  isForSale: boolean;

  constructor(productJson: any) {
    this.id = productJson.id;
    this.name = productJson.name;
    this.hasConsignment = productJson.hasConsignment;
    this.observation = productJson.observation;
    this.isActive = productJson.isActive;
    this.price = productJson.price;
    this.category = productJson.category;
    this.isForSale = productJson.isForSale;
  }
}