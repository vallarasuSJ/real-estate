import { Component, OnInit } from '@angular/core';
import { AgentProperties } from 'src/app/model/agent-properties';
import { PropertyDetail } from 'src/app/model/property';
import { PropertyService } from 'src/app/service/property.service';
import { AgentPageComponent } from '../agent-page/agent-page.component';
import { AgentService } from 'src/app/service/agent.service';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {

  constructor(private propertyService: PropertyService,private agentService:AgentService,private bookingService:BookingService,private storageService:StorageService) {
    this.propertyDetail=propertyService.getSelectedProperty();
    this.agentProperty=agentService.getSelectedProperty();
  }

  error: String = '';
  propertyDetail:PropertyDetail={
    id:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
  }

  agentProperty:AgentProperties={
    propertyId:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
  }
  
  ngOnInit(): void {
  }

  bookProperty(propertyDetail:PropertyDetail){
    propertyDetail.customerId=this.storageService.getLoggedInUser().id;
    console.log(propertyDetail);
    this.bookingService.bookProperty(propertyDetail).subscribe({
      next:(response)=>{
        response.data;
      },
      error:(err)=>{
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    
    
  

  }


  
}
