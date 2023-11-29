import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { PropertyDetail } from 'src/app/model/property';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-update-property',
  templateUrl: './update-property.component.html',
  styleUrls: ['./update-property.component.css']
})
export class UpdatePropertyComponent implements OnInit {
  propertyName:string='';
  price:number=0;
  Address:string='';
  city:string='';
  zipcode:number=0;
  error:String=""; 
  id:number=0;
  propertyId:number=0;
  addressId:number=0;

  // property:PropertyDetail={
  //   propertyName:this.propertyName,
  //   price:this.price,
  //   address:this.Address,
  //   city:this.city,
  //   zipcode:this.zipcode,
  //   agentId:this.storageService.getLoggedInUser().id,
  // }

  constructor(private propertyService:PropertyService,private storageService:StorageService,private route:ActivatedRoute){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id=params['id'];
    })
    
   
    this.propertyService.editSelectedProperty(this.id).subscribe({
      next:(response)=>{
        let property:PropertyDetail=response.data;
        this.propertyName=property.propertyName;
        this.Address=property.address;
        this.city=property.city;
        this.zipcode=property.zipcode;
        this.price=property.price;
        this.addressId!=property.addressId;
      }
    })
}

 

  updateProperty(updatePropertyForm:Form):void{
    this.route.queryParams.subscribe(params=>{
      this.id=params['id'];
    })
    
    let property:PropertyDetail={
      id:this.id,
      propertyName:this.propertyName,
      price:this.price,
      address:this.Address,
      city:this.city,
      zipcode:this.zipcode,
      agentId:this.storageService.getLoggedInUser().id,
    }
    this.propertyService.updateProperty(property).subscribe({
      next:(response)=>{
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    
  }


}
