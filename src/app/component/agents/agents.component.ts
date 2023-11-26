import { Component, OnInit } from '@angular/core';
import { AgentProperties } from 'src/app/model/agent-properties';
import { Agents } from 'src/app/model/agents';
import { PropertyDetail } from 'src/app/model/property';
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
  agentProperty:AgentProperties={
    id:0,
    propertyId:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
    
  }

  constructor(private agentService:AgentService,private adminService:AdminService){}
  ngOnInit(): void {
    this.agentService.getAgents().subscribe({
      next:(response)=>{
        let agentProperties:AgentProperties[]=response.data;
        console.log(agentProperties);
        
        if(agentProperties.length>0){
          this.agents= agentProperties;  
          this.agentProperty=response.data[0];
        }
        
      },
      error: (err:any) => {
        let message: string = err?.error?.error?.message;
        this.error = message.includes(",") ? message.split(",")[0] : message;
      },
    });
  }
  setSelectedProperty(agent:AgentProperties){
    this.agentService.setSelectedProperty(agent);
  }


 

  

}
