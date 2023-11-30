import { Address } from './address';
import { FileType } from './file-type';
import { PropertyDetail } from './property';

export interface Category {
  categoryId?: number;
  categoryName?: string;
  propertyName:string;
  propertyId?:number;
  address:string;
  city:string;
  zipcode:number;
  photo?:FileType;
  approve?:boolean;
  price:number;
  contactNumber?:number;
  agentName?:string;
}
