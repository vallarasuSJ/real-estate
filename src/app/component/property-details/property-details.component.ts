import { Component, OnInit } from '@angular/core';
import { AgentProperties } from 'src/app/model/agent-properties';
import { PropertyDetail } from 'src/app/model/property';
import { PropertyService } from 'src/app/service/property.service';
import { AgentPageComponent } from '../agent-page/agent-page.component';
import { AgentService } from 'src/app/service/agent.service';
import { BookingService } from 'src/app/service/booking.service';
import { StorageService } from 'src/app/service/storage.service';
import { Category } from 'src/app/model/category';
import { CategoryService } from 'src/app/service/category.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-property-details',
  templateUrl: './property-details.component.html',
  styleUrls: ['./property-details.component.css'],
})
export class PropertyDetailsComponent implements OnInit {
  constructor(
    private propertyService: PropertyService,
    private agentService: AgentService,
    private bookingService: BookingService,
    private storageService: StorageService,
    private categoryService: CategoryService,
    private router: Router
  ) {
    this.propertyDetail = propertyService.getSelectedProperty();
    console.log(this.propertyDetail);

    this.agentProperty = agentService.getSelectedProperty();
    this.categoryProperties = propertyService.getCategoryProperty();
  }
  role: String = '';
  error: String = '';
  propertyDetail: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
    agentId: 0,
  };

  agentProperty: AgentProperties = {
    propertyId: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
  };

  categoryProperties: Category = {
    categoryId: 0,
    propertyId: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
  };

  ngOnInit(): void {
    this.role = this.storageService.getLoggedInUser().role;
  }

  bookProperty(propertyDetail: PropertyDetail) {
    propertyDetail.customerId = this.storageService.getLoggedInUser().id;
    console.log(propertyDetail);
    this.bookingService.bookProperty(propertyDetail).subscribe({
      next: (response) => {
        response.data;
        this.router.navigate(['/bookedProperties'], { replaceUrl: true });
      },
      error: (err) => {
        let message: String = err.error.error.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.ngOnInit();
  }
}
