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
  ngOnInit(): void {
    this.customerService.getCustomer().subscribe({
      next: (response) => {
        this.customerBookings = response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
