import { Component, OnInit } from '@angular/core';
import { CustomerBookings } from 'src/app/model/customer-bookings';
import { CustomerService } from 'src/app/service/customer.service';

@Component({
  selector: 'app-customer-bookings',
  templateUrl: './customer-bookings.component.html',
  styleUrls: ['./customer-bookings.component.css'],
})
export class CustomerBookingsComponent implements OnInit {
  constructor(private customerService: CustomerService) {}
  error: string = '';
  customerBookings: CustomerBookings[] = [];
  customerBooking:CustomerBookings={
    propertyId:0,
    name:'',
    propertyName:'',
    address:'',
    city:'',
    zipcode:0,
    price:0,
    contactNumber:0,
    bookedTime:0
  }
  currentPage: number = 1;
  itemsPerPage: number = 3;

  ngOnInit(): void {

    //function to get all customer bookings for admin
    this.customerService.getCustomerBookings().subscribe({
      next: (response) => {
        this.customerBookings = response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //returns total no of pages based on total no of items
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.customerBookings.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

   //returns last page
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }
}
