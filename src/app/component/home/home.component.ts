import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeService } from 'src/app/service/home.service';
import { PropertyService } from 'src/app/service/property.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent implements OnInit{
  constructor(private categoryService:CategoryService){}
  categories:Category[]=[];
  error:string="";
  ngOnInit(): void {
    this.categoryService.getCategory().subscribe({
      next:(response)=>{
        this.categories=response.data;
        console.log(this.categories);  
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    })
    
  }
  setCategoryId(categoryId:number){
    this.categoryService.setCategoryId(categoryId);
  }
 
}
