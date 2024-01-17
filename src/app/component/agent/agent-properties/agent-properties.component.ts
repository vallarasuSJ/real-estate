import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppResponse } from 'src/app/model/appResponse';
import { PropertyDetail } from 'src/app/model/property';
import { AdminService } from 'src/app/service/admin.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-agent-properties',
  templateUrl: './agent-properties.component.html',
  styleUrls: ['./agent-properties.component.css'],
})
export class AgentPropertiesComponent implements OnInit {
  error: string = '';
  properties: PropertyDetail[] = [];
  totalProperties:PropertyDetail[]=[];
  property: PropertyDetail = {
    id: 0,
    propertyName: '',
    price: 0,
    address: '',
    city: '',
    zipcode: 0,
  };
  currentPage: number = 1;
  itemsPerPage:number=4;
  agentId: number = 0;
  selectedPropertyId:number|null=null;
  search:String='';

  constructor(
    private propertyService: PropertyService,
    private adminService: AdminService,
    private router: Router,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
    this.agentId = this.storageService.getLoggedInUser().id;

    //function to get the logged agent properties
    this.propertyService.getAgentPropertyDetails(this.agentId).subscribe({
      next: (response: AppResponse) => {
        this.properties=response.data;
        this.totalProperties=response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
  }

  //set respective property object to the property service to show details in property details component
  setSelectedProperty(property: PropertyDetail): void {
    this.propertyService.setSelectedProperty(property);
  }

  //set property id in modal for delete property method
  setSelectedPropertyId(propertyId: number) {
    this.selectedPropertyId = propertyId;
  }

  //filter the properties for search feature
  filterArray(){
    this.properties=this.totalProperties.filter((e:any) => {
      return e.propertyName.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
    })
  }

  //edit property method
  editProperty(id: number) {
    this.router.navigate(['/updateProperty'], { queryParams: { id: id } });
    this.propertyService.editSelectedProperty(id);
  }

  onCancelDelete(){
    this.router.navigate(['/agentProperties'],{ replaceUrl: true });
  }

  //delete property method
  deleteProperty(id: number) {
    console.log(id);

    this.propertyService.deleteProperty(id).subscribe({
      next: (response: AppResponse) => {
        this.property = response.data;
      },
      error: (err: any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(',') ? message.split(',')[0] : message;
      },
    });
    this.router.navigate(['/'], { replaceUrl: true });
  }
    //returns total no of pages based on total no of items
    getPageNumbers(): number[] {
      const pageCount = Math.ceil(this.properties.length / this.itemsPerPage);
      return Array.from({ length: pageCount }, (_, index) => index + 1);
    }
  
     //returns last page
    getLastPage(): number {
      return this.getPageNumbers().slice(-1)[0] || 1;
    }

     // Sort Properties in descending order alphabetically (A to Z)
    sortPropertiesAToZ() {
      this.properties.sort((a, b) =>
        (a.propertyName || '').localeCompare(b.propertyName)
      );
    }
   
    // Sort Properties in descending order alphabetically (Z to A)
    sortPropertiesZToA() {
      this.properties.sort((a, b) =>
        (b.propertyName || '').localeCompare(a.propertyName)
      );
    }
}
