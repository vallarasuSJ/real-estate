import { SafeResourceUrl } from "@angular/platform-browser";

export interface PropertyDetail {
  id?: number;
  propertyName: string;
  price: number;
  address: string;
  city: string;
  zipcode: number;
  agentId?: number;
  addressId?: number;
  customerId?: number;
  approve?:boolean;
}
