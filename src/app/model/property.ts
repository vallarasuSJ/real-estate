import { SafeResourceUrl } from "@angular/platform-browser";
import { FileType } from "./file-type";

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
  categoryId?:number;
  photo?:FileType;
  agentName?:string;
  contactNumber?:number;
  categoryName?:string;
}
