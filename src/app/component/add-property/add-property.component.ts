import { Component, OnInit, ViewChild } from '@angular/core';
import { Form } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { PropertyDetail } from 'src/app/model/property';
import { AddressService } from 'src/app/service/address.service';
import { AuthService } from 'src/app/service/auth.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit{
  propertyName:string='';
  price:number=0;
  Address:string='';
  city:string='';
  zipcode:number=0;
  error:String="";
  
  address:Address[]=[];
  

  constructor(private propertyService:PropertyService,private storageService:StorageService){}
  ngOnInit(): void {
    this.propertyName="";
    this.price=0;
    this.Address='';
    this.city='';
    this.zipcode=0;
    
  }
    

  addProperty(addPropertyForm:Form):void{
    let property:PropertyDetail={
      propertyName:this.propertyName,
      price:this.price,
      address:this.Address,
      city:this.city,
      zipcode:this.zipcode,
      agentId:this.storageService.getLoggedInUser().id,
    }
    this.propertyService.addProperty(property).subscribe({
      next:(response)=>{
        console.log(response.data);
      },
      error: (err) => {
        console.log(err);
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    this.ngOnInit();

  }


}
