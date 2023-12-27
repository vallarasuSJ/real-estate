import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { PropertyDetail } from '../model/property';
import { AgentProperties } from '../model/agent-properties';

@Injectable({
  providedIn: 'root'
})
export class AgentService {
 
  agentProperty:AgentProperties={
    propertyId:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
  }

  constructor(private http:HttpClient) { }

  //Retrieves details of all agent properties from the server.
  getAgents():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/agent/properties/all`);
  }

  //Sets the selected agent property.
  setSelectedProperty(agent: AgentProperties): void {
    this.agentProperty=agent;
  }

  //Retrieves the currently selected agent property.
  getSelectedProperty():AgentProperties{
    return this.agentProperty;
  }

  //Deletes a specific property by sending id to the endpoint
  deleteProperty(id: number):Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/{id}`);
  }

  // Retrieves details of all agents from the server.
  getAllAgents():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/agent/all`);
  } 
  
 
}
