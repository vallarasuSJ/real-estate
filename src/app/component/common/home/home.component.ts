import { Component, OnInit } from '@angular/core';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  categories:Category[]=[];
  error:string="";

  constructor(private categoryService:CategoryService){}

  ngOnInit(): void {

    //function to get category names
    this.categoryService.getCategory().subscribe({
      next:(response: AppResponse)=>{
        this.categories=response.data;
        console.log(this.categories);  
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    })
    
  }

  //set category id to the service to fetch category properties
  setCategoryId(categoryId:number){
    this.categoryService.setCategoryId(categoryId);
  }
 
}
