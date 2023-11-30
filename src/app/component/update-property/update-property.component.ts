import { Component, OnInit } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
  price:number|null=null;
  address:string='';
  city:string='';
  zipcode:number | null=null;
  error:String=""; 
  id:number=0;
  propertyId:number=0;
  addressId:number=0;
  file='';

  constructor(private propertyService:PropertyService,private storageService:StorageService,private route:ActivatedRoute,private router:Router){

  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.id=params['id'];
    })
    
   
    this.propertyService.editSelectedProperty(this.id).subscribe({
      next:(response)=>{
        let property:PropertyDetail=response.data;
        console.log(property
          );
        
        this.propertyName=property.propertyName;
        this.address=property.address;
        this.city=property.city;
        this.zipcode=property.zipcode;
        this.price=property.price;
        this.addressId!=property.addressId;
      }
    })
}

 

  updateProperty(updatePropertyForm:NgForm):void{
    this.route.queryParams.subscribe(params=>{
      this.id=params['id'];
    })
    
    let agentId:number=this.storageService.getLoggedInUser().id;

    const formData=new FormData();
    console.log(updatePropertyForm.value);
    
    
  
    formData.append('propertyName',updatePropertyForm.value.propertyName);
    formData.append('price',updatePropertyForm.value.price);
    formData.append('address',updatePropertyForm.value.address);
    formData.append('city',updatePropertyForm.value.city);
    formData.append('zipcode',updatePropertyForm.value.zipcode);
    console.log(formData);
    this.propertyService.updateProperty(formData,this.id,agentId).subscribe({
      next:(response)=>{
        console.log(response.data);
        this.router.navigate(['/'],{replaceUrl:true});
      },
      error: (err) => {
        console.log(err);
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    
    this.propertyName='';
    this.address='';
    this.city='';
    this.zipcode=null;
    this.price=null;
  
  }
 


}
