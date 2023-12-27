import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
 
  userId:number=0;
  error: String = '';
  booked: bookedProperties[] = [];
  options: AnimationOptions = {
    path: '/assets/bookingsEmpty.json',
  };
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(private bookingService: BookingService,private storageService:StorageService,private router: Router,) {}

  ngOnInit(): void {
    this.userId=this.storageService.getLoggedInUser().id;
    //function to fetch user booked properties
    this.bookingService.getAllBookedProperties(this.userId).subscribe({
      next: (response) => {
        this.booked=response.data;
       
        console.log(this.booked);
        
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //function to cancel booking
  cancelBooking(id:number){
    console.log(id);
    
    this.bookingService.cancelBooking(id).subscribe({
      next:(response)=>{
        this.booked=response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    })
    this.ngOnInit();
    this.router.navigate(['/'],{ replaceUrl: true });
    
  }
  onCancelDelete(){
    this.router.navigate(['/bookedProperties'],{ replaceUrl: true });
  }

    //returns total no of pages based on total no of items
    getPageNumbers(): number[] {
      const pageCount = Math.ceil(this.booked.length / this.itemsPerPage);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
  
    //returns last page
    getLastPage(): number {
      return this.getPageNumbers().slice(-1)[0] || 1;
    }
 
}
