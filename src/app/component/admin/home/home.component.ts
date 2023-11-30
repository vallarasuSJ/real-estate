import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Observable } from 'rxjs';
import { Agents } from 'src/app/model/agents';
import { AppResponse } from 'src/app/model/appResponse';
import { Customer } from 'src/app/model/customer';
import { CustomerBookings } from 'src/app/model/customer-bookings';
import { PropertyDetail } from 'src/app/model/property';
import { AgentService } from 'src/app/service/agent.service';
import { AuthService } from 'src/app/service/auth.service';
import { BookingService } from 'src/app/service/booking.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PropertyService } from 'src/app/service/property.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private storageService: StorageService,
    private propertyService: PropertyService,
    private bookingService: BookingService,
    private customerService: CustomerService,
    private agentService: AgentService
  ) {}
  options: AnimationOptions = {
    path: '/assets/admin.json',
  };

  property:PropertyDetail[]=[];
  agents:Agents[]=[];
  customers:Customer[]=[];
  customerBookings:CustomerBookings[]=[];
  totalAgents:number=0;
  totalCustomers:number=0;
  totalBookings:number=0;
  totalProperties:number=0;
  
  logout(): void {
    this.authService.logout();
  }

  ngOnInit(): void {
    this.propertyService.getAllProperties().subscribe({
      next:(response)=>{
        this.property=response.data;
        this.totalProperties=this.property.length;
      }
    })
    this.agentService.getAllAgents().subscribe({
      next:(response)=>{
        this.agents=response.data;
        this.totalAgents=this.agents.length;      
      }
    })
    this.customerService.getAllCustomers().subscribe({
      next:(response)=>{
        this.customers=response.data;
        this.totalCustomers=this.customers.length;      
      }
    })
    this.customerService.getCustomer().subscribe({
      next:(response)=>{
        this.customerBookings=response.data;
        this.totalBookings=this.customerBookings.length;      
      }
    })
    
  }
}
