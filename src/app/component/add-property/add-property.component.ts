import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Address } from 'src/app/model/address';
import { Category } from 'src/app/model/category';
import { PropertyDetail } from 'src/app/model/property';
import { AddressService } from 'src/app/service/address.service';
import { AuthService } from 'src/app/service/auth.service';
import { CategoryService } from 'src/app/service/category.service';
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
  categoryId:number=0;
  file='';

  address:Address[]=[];
  categories:Category[]=[];
  

  constructor(private propertyService:PropertyService,private storageService:StorageService,private categoryService:CategoryService){}
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next:(response)=>{
        this.categories=response.data;
        console.log(this.categories);
        
      },
      error:(err)=>{
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      }
    })
    this.propertyName="";
    this.price=0;
    this.Address='';
    this.city='';
    this.zipcode=0;

    
  }
    

  onSubmit(addPropertyForm:NgForm):void{
    let id:number=this.storageService.getLoggedInUser().id;
    let categoryId=addPropertyForm.value.categoryId;

    const formData=new FormData();
    console.log(addPropertyForm.value);
    
    
    formData.append('photo',this.file);
    formData.append('propertyName',addPropertyForm.value.propertyName);
    formData.append('price',addPropertyForm.value.price);
    formData.append('address',addPropertyForm.value.address);
    formData.append('city',addPropertyForm.value.city);
    formData.append('zipcode',addPropertyForm.value.zipcode);
    console.log(formData);
    

    this.propertyService.addProperty(formData,categoryId,id).subscribe({
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

  onFileChange(event:any){
    const fileInput=event.target;
    if(fileInput && fileInput.files.length>0){
      this.file=fileInput.files[0];
    }
    console.log(this.file);
    
  }


}
