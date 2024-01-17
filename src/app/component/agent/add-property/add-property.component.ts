import { Component, OnInit, ViewChild } from '@angular/core';
import { Form, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Address } from 'src/app/model/address';
import { AppResponse } from 'src/app/model/appResponse';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css'],
})
export class AddPropertyComponent implements OnInit {
  propertyName: string = '';
  price: number | null = null;
  Address: string = '';
  city: string = '';
  zipcode: number | null = null;
  error: String = '';
  categoryId: number = -1;
  file = '';
  address: Address[] = [];
  categories: Category[] = [];

  constructor(
    private propertyService: PropertyService,
    private storageService: StorageService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void { 
    //getting all categories for dropdown list in form
    this.categoryService.getCategory().subscribe({
      next: (response: AppResponse) => {
        this.categories = response.data;
        console.log(this.categories);
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.propertyName = '';
    this.price = null;
    this.Address = '';
    this.city = '';
    this.zipcode = null;
  }

  //adding property details in form data object
  onSubmit(addPropertyForm: NgForm): void {
    let id: number = this.storageService.getLoggedInUser().id;
    let categoryId = addPropertyForm.value.categoryId;

    const formData = new FormData();
    console.log(addPropertyForm.value);

    formData.append('image', this.file);
    formData.append('propertyName', addPropertyForm.value.propertyName);
    formData.append('price', addPropertyForm.value.price);
    formData.append('address', addPropertyForm.value.address);
    formData.append('city', addPropertyForm.value.city);
    formData.append('zipcode', addPropertyForm.value.zipcode);
    console.log(formData);

    //function to post property to a specific category and agent
    this.propertyService.addProperty(formData, categoryId, id).subscribe({
      next: (response: AppResponse) => {
        console.log(response.data);
        this.router.navigate(['/'], { replaceUrl: true });
      },
      error: (err) => {
        console.log(err);
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.ngOnInit();
  }

  //getting the file from front end
  onFileChange(event: any) {
    const fileInput = event.target;
    if (fileInput && fileInput.files.length > 0) {
      this.file = fileInput.files[0];
    }
    console.log(this.file);
  }
}
