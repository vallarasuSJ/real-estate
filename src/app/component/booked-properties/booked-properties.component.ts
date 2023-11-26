import { Component, OnInit } from '@angular/core';
import { bookedProperties } from 'src/app/model/booked';
import { BookingService } from 'src/app/service/booking.service';

@Component({
  selector: 'app-booked-properties',
  templateUrl: './booked-properties.component.html',
  styleUrls: ['./booked-properties.component.css'],
})
export class BookedPropertiesComponent implements OnInit {
  error: String = '';
  booked: bookedProperties[] = [];

  constructor(private bookingService: BookingService) {}
  ngOnInit(): void {
    this.bookingService.getAllBookedProperties().subscribe({
      next: (response) => {
        this.booked=response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  cancelBooking(id:number){
    this.bookingService.cancelBooking(id).subscribe({
      next:(response)=>{
        this.booked=response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    })
  }
}
