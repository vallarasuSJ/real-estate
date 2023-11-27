import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgentProperties } from 'src/app/model/agent-properties';
import { Agents } from 'src/app/model/agents';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { AgentService } from 'src/app/service/agent.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-approve-property',
  templateUrl: './approve-property.component.html',
  styleUrls: ['./approve-property.component.css'],
})
export class ApprovePropertyComponent implements OnInit {
  error: string = '';
  properties: PropertyDetail[] = [];
  property: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
    approve: false,
  };

  constructor(
    private propertyService: PropertyService,
    private adminService: AdminService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.propertyService.getPropertyDetails().subscribe({
      next: (response) => {
        let propertyDetails: PropertyDetail[] = response.data;
        if (propertyDetails.length > 0) {
          this.properties = propertyDetails;
          this.property = response.data[0];
        }
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
  setSelectedProperty(property: PropertyDetail): void {
    this.propertyService.setSelectedProperty(property);
  }

  approveProperty(property: PropertyDetail) {
    this.adminService.approveProperty(property).subscribe({
      next: (response) => {
        response.data;
        this.ngOnInit();
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }
}
