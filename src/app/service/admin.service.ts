import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { AgentProperties } from '../model/agent-properties';
import { PropertyDetail } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  

  constructor(private http:HttpClient) { }

  approveProperty(property: PropertyDetail):Observable<AppResponse> {
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/admin/property/update`,property);
  }
}
