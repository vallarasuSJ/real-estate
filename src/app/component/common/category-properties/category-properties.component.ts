import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/model/category';
import { PropertyDetail } from 'src/app/model/property';
import { CategoryService } from 'src/app/service/category.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-category-properties',
  templateUrl: './category-properties.component.html',
  styleUrls: ['./category-properties.component.css'],
})
export class CategoryPropertiesComponent implements OnInit {
  error: String = '';
  categories: Category[] = [];
  id: number = 0;
  currentPage: number = 1;
  itemsPerPage: number = 4;

  constructor(
    private propertyService: PropertyService,
    private categoryService: CategoryService
  ) {}
  
  ngOnInit(): void {
    this.id = this.categoryService.getCategoryId();

    //function to fetch all category properties
    this.categoryService.getCategoryProperties(this.id).subscribe({
      next: (response) => {
        this.categories = response.data;
        console.log(this.categories);
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //returns total no of pages based on total no of items
  getPageNumbers(): number[] {
    const pageCount = Math.ceil(this.categories.length / this.itemsPerPage);
    return Array.from({ length: pageCount }, (_, index) => index + 1);
  }

  //returns last page
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }
}
