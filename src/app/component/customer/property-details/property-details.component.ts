import { Component, OnInit } from '@angular/core';
import { PropertyDetail } from 'src/app/model/property';
import { PropertyService } from 'src/app/service/property.service';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  role: String = '';
  error: String = '';
  propertyDetail: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
    agentId: 0,
  };

  constructor(
    private propertyService: PropertyService,
    private bookingService: BookingService,
    private storageService: StorageService,
    private router: Router
  ) {
    //fetching the property details from service
    this.propertyDetail = propertyService.getSelectedProperty();
    console.log(this.propertyDetail);
  }

  ngOnInit(): void {
    this.role = this.storageService.getLoggedInUser().role;
  }

  //function to book property 
  bookProperty(propertyDetail: PropertyDetail) {
    propertyDetail.customerId = this.storageService.getLoggedInUser().id;
    console.log(propertyDetail);
    this.bookingService.bookProperty(propertyDetail).subscribe({
      next: (response) => {
        response.data;
        this.router.navigate(['/bookedProperties'], { replaceUrl: true });
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.ngOnInit();
  }

  onCancelDelete(){
    this.router.navigate(['/propertyDetails'],{ replaceUrl: true });
  }
}
