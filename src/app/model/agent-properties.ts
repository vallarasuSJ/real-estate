import { Address } from "./address";

export interface AgentProperties {
  id?: number;
  agentName?: string;
  contactNumber?: number;
  propertyId: number;
  propertyName: string;
  price: number;
  address: string;
  city: string;
  zipcode: number;
  propertyList?: [
    {
      propertyId:number,
      propertyName: string;
      price: number;
      address:Address;
    }
  ];
}
