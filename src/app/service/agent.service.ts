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

  getAgents():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/agent/properties/all`);
  }

  setSelectedProperty(agent: AgentProperties): void {
    this.agentProperty=agent;
  }
  getSelectedProperty():AgentProperties{
    return this.agentProperty;
  }

  deleteProperty(id: number):Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/{id}`);
  }
  getAllAgents():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/agent/all`);
  } 
  
 
}
