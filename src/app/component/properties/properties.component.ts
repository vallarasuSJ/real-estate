import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.css']
})
export class PropertiesComponent implements OnInit{
  error: string = '';
  properties: PropertyDetail[] = [];
  property:PropertyDetail={
    id:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
  }

  constructor(private propertyService: PropertyService,private adminService:AdminService,private router:Router) {}

  ngOnInit(): void {
    this.propertyService.getPropertyDetails().subscribe({
      next:(response)=>{
        let propertyDetails:PropertyDetail[]=response.data;
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

  approveProperty(property:PropertyDetail){
   
      this.adminService.approveProperty(property).subscribe({
        next:(response)=>{
          console.log(response.data);
          
        },
        error: (err:any) => {
          let message: string = err?.error?.error?.message;
          this.error = message.includes(",") ? message.split(",")[0] : message;
        },
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
