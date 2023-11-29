import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { PropertyDetail } from 'src/app/model/property';
import { CategoryService } from 'src/app/service/category.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-category-properties',
  templateUrl: './category-properties.component.html',
  styleUrls: ['./category-properties.component.css']
})
export class CategoryPropertiesComponent implements OnInit{

  constructor(private propertyService:PropertyService,private categoryService:CategoryService){}
  error: String = '';
  categories: Category[] = [];
  id:number=0;

  ngOnInit(): void {
    this.id=this.categoryService.getCategoryId();

    this.categoryService.getCategoryProperties(this.id).subscribe({
      next:(response)=>{
        this.categories=response.data;
        console.log(this.categories);
        
      },
      error:(err:any)=>{
        let message:string=err?.error?.error?.message;
        this.error=message.includes(",")?message.split(",")[0]:message;
      }
    })
   
  }

 

}
