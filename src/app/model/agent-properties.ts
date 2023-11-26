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
      propertyName: string;
      price: number;
      address: string;
      city: string;
      zipcode: number;
    }
  ];
}
