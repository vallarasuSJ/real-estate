import { Component, OnInit } from '@angular/core';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { AuthService } from 'src/app/service/auth.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-approve-property',
  templateUrl: './approve-property.component.html',
  styleUrls: ['./approve-property.component.css'],
})
export class ApprovePropertyComponent implements OnInit {
  error: string = '';
  properties: PropertyDetail[] = [];
  property: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
    approve: false,
  };
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(
    private propertyService: PropertyService,
    private adminService: AdminService,
    private authService:AuthService
  ) {}

  ngOnInit(): void { 
    
    //function to retreive all properties
    this.propertyService.getPropertyDetails().subscribe({
      next: (response) => {
        this.properties = response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //function to approve property
  approveProperty(property: PropertyDetail) {
    this.adminService.approveProperty(property).subscribe({
      next: (response) => {
        response.data;
        this.ngOnInit();
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  // Function to generate an array of page numbers
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.properties.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  // Function to get the last page number
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }
}
