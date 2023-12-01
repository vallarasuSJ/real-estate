import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-agent-properties',
  templateUrl: './agent-properties.component.html',
  styleUrls: ['./agent-properties.component.css']
})
export class AgentPropertiesComponent implements OnInit{
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
  agentId:number=0;

  constructor(private propertyService: PropertyService,private adminService:AdminService,private router:Router,private storageService:StorageService) {}
  
  ngOnInit(): void {
    this.agentId=this.storageService.getLoggedInUser().id;
    this.propertyService.getAgentPropertyDetails(this.agentId).subscribe({
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
    this.router.navigate(['/'],{replaceUrl:true});
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
