import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentProperties } from 'src/app/model/agent-properties';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { AgentService } from 'src/app/service/agent.service';
import { BookingService } from 'src/app/service/booking.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit{
  error: String = '';
  properties: PropertyDetail[] = [];
  property:PropertyDetail={
    id:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
    approve:false
  }
  constructor(private propertyService: PropertyService,private adminService:AdminService,private router:Router) {

  }

  ngOnInit(): void {
    this.propertyService.getPropertyDetails().subscribe({
      next:(response)=>{
        let propertyDetails:PropertyDetail[]=response.data;
        console.log(propertyDetails);
        
        if(propertyDetails.length>0){
          this.properties=propertyDetails;
          this.property=response.data[0];

        }
        
      },
      error:(err:any)=>{
        let message:string=err?.error?.error?.message;
        this.error=message.includes(",")?message.split(",")[0]:message;
      }
    })
  }
  setSelectedProperty(property:PropertyDetail):void{
    this.propertyService.setSelectedProperty(property);

  }
  
  deleteProperty(id:number ){    
    console.log(id);
    
    this.propertyService.deleteProperty(id).subscribe({
      next:(response)=>{
        this.property=response.data;
      },
      error:(err:any)=>{
        let message:string=err?.error?.error?.message;
        this.error=message.includes(",")?message.split(",")[0]:message;
      }
    })
  }

  editProperty(id:number){
    this.router.navigate(
      ['/updateProperty'],
      { queryParams: { id:id } }
    );
    this.propertyService.editSelectedProperty(id);
  }


    


    }  
