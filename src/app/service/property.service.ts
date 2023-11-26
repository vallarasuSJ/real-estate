import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { PropertyDetail } from '../model/property';
import { AppUser } from '../model/appUser';

@Injectable({
  providedIn: 'root'
})
export class PropertyService { 
  propertyDetail:PropertyDetail={
    id:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0,
    agentId:0,  
  }

  constructor(private http:HttpClient){}

  getPropertyDetails():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/property/all`);
  }

  setSelectedProperty(property: PropertyDetail):void {
    this.propertyDetail=property;
    
  }
  editSelectedProperty(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties/${id}`)
  }
  getSelectedProperty():PropertyDetail{
    return this.propertyDetail;
  }

  deleteProperty(id: number):Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${id}`);
  }

  addProperty(property: PropertyDetail):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/agent/property`,property);  
  }

  updateProperty(property: PropertyDetail) {
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties`,property); 
  }
 

}
