import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { bookedProperties } from 'src/app/model/booked';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-booked-properties',
  templateUrl: './booked-properties.component.html',
  styleUrls: ['./booked-properties.component.css'],
})
export class BookedPropertiesComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/bookingsEmpty.json',
  };
  userId:number=0;
  error: String = '';
  booked: bookedProperties[] = [];

  constructor(private bookingService: BookingService,private storageService:StorageService) {}
  ngOnInit(): void {
    this.userId=this.storageService.getLoggedInUser().id;
    this.bookingService.getAllBookedProperties().subscribe({
      next: (response) => {
        this.booked=response.data;
       
        console.log(this.userId);
        
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
