import { Component, OnInit } from '@angular/core';
import { AgentProperties } from 'src/app/model/agent-properties';
import { AppResponse } from 'src/app/model/appResponse';
import { AdminService } from 'src/app/service/admin.service';
import { AgentService } from 'src/app/service/agent.service';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.css']
})
export class AgentsComponent implements OnInit {

  error:String="";
  agents:AgentProperties[]=[];
  currentPage: number = 1;
  itemsPerPage: number = 3;

  constructor(private agentService:AgentService,private adminService:AdminService){}

  ngOnInit(): void {
    //function to get all agents and their properties
    this.agentService.getAgents().subscribe({
      next:(response: AppResponse)=>{
        this.agents=response.data;
        console.log(response.data);
        
      },
      error: (err:any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  
   // Function to calculate the starting index of properties for the current page
   get startPropertyIndex(): number {
    return (this.currentPage - 1) * this.itemsPerPage;
  }

  // Function to get the total number of pages
  get totalPropertyPages(): number {
    const totalProperties = this.agents.reduce((total, agent) => total + this.agents.length, 0);
    return Math.ceil(totalProperties / this.itemsPerPage);
  }

  // Function to generate an array of page numbers
  getPageNumbers(): number[] {
    return Array.from({ length: this.totalPropertyPages }, (_, index) => index + 1);
  }

  // Function to get the last page number
  getLastPage(): number {
    return this.getPageNumbers().slice(-1)[0] || 1;
  }

  setSelectedProperty(agent:AgentProperties){
    this.agentService.setSelectedProperty(agent);
  }

}
