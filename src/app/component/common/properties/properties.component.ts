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

  constructor(
    private propertyService: PropertyService,
  ) {}

  ngOnInit(): void {
    //function to get all properties
    this.propertyService.getPropertyDetails().subscribe({
      next: (response) => {
        this.properties  = response.data;
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

  //filter function for search feature
  filterArray() {
    this.properties = this.totalProperties.filter((e: any) => {
      return (
        e.propertyName.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      );
    });
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
}
