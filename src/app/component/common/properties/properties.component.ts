import { Component, OnInit } from '@angular/core';
import { PropertyDetail } from 'src/app/model/property';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css'],
})
export class PropertiesComponent implements OnInit {
  error: String = '';
  properties: PropertyDetail[] = [];
  totalProperties: PropertyDetail[] = [];
  property: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
    approve: false,
  };
  search: String = '';
  currentPage: number = 1;
  itemsPerPage: number = 8;
  isFiltered: boolean = false;
  selectedPriceRangeProperty:PropertyDetail[]=[];
  minPrice:number=0;
  maxPrice:number=900000;
  constructor(private propertyService: PropertyService) {}

  ngOnInit(): void {
    //function to get all properties
    this.propertyService.getPropertyDetails().subscribe({
      next: (response) => {
        this.properties = response.data;
        this.totalProperties = response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //set  specific property to the service
  setSelectedProperty(property: PropertyDetail): void {
    this.propertyService.setSelectedProperty(property);
  }

  //returns total no of pages based on total no of items
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.properties.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  //returns last page
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  //price range filter
  applyFilters(): void {
      this.properties = this.totalProperties.filter(
        (property: PropertyDetail) => {
          const priceMatches =
            ( property.price >= this.minPrice) &&
            ( property.price <= this.maxPrice);

          return priceMatches;
        }
      );
      this.selectedPriceRangeProperty=this.properties;
      this.isFiltered=true;
  }

  //search function for search feature
  searchArray() {
    if(this.isFiltered==false){
    this.properties = this.totalProperties.filter((e: any) => {
      return (
        e.propertyName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
  }else{ 
    this.properties = this.selectedPriceRangeProperty.filter((e: any) => {
      return (
        e.propertyName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
  }
  }
}
