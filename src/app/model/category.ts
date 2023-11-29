import { Address } from './address';
import { PropertyDetail } from './property';

export interface Category {
  categoryId: number;
  categoryName: string;
  propertyList?: [
    {
      propertyName: string,
      price: number,
      address:Address[],
    }
  ];
}
