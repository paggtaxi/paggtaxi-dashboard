import { User } from "./user.model";
export class TaxiDriver {
  "id": number;
  "created": string;
  "user": User;
  "prefixo": string;
  "cpf": string;
  "is_money_seclusion": boolean;
  "is_ride_seclusion": boolean;
  "is_seclusion": boolean;
  "active": boolean;
}