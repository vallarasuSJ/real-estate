import { Component, OnInit } from '@angular/core';
import { AnimationOptions } from 'ngx-lottie';
import { Agents } from 'src/app/model/agents';
import { AppResponse } from 'src/app/model/appResponse';
import { Customer } from 'src/app/model/customer';
import { CustomerBookings } from 'src/app/model/customer-bookings';
import { PropertyDetail } from 'src/app/model/property';
import { AgentService } from 'src/app/service/agent.service';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
import { PropertyService } from 'src/app/service/property.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class AdminHomeComponent implements OnInit{
  constructor(
    private authService: AuthService,
    private propertyService: PropertyService,
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

  ngOnInit(): void {

    //getting all properties
    this.propertyService.getAllProperties().subscribe({
      next:(response: AppResponse)=>{
        this.property=response.data;
        this.totalProperties=this.property.length;
      }
    })

    //getting all agents
    this.agentService.getAllAgents().subscribe({
      next:(response: AppResponse)=>{
        this.agents=response.data;
        this.totalAgents=this.agents.length;      
      }
    })

    //getting all customers
    this.customerService.getAllCustomers().subscribe({
      next:(response: AppResponse)=>{
        this.customers=response.data;
        this.totalCustomers=this.customers.length;      
      }
    })

    //getting all customer bookings
    this.customerService.getCustomerBookings().subscribe({
      next:(response: AppResponse)=>{
        this.customerBookings=response.data;
        this.totalBookings=this.customerBookings.length;      
      }
    })
    
  }
}
