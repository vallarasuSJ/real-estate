import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { PropertyDetail } from '../model/property';
import { AppUser } from '../model/appUser';
import { Category } from '../model/category';

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

  categoryProperties:Category={
    propertyId:0,
    propertyName:"",
    price:0,
    address:"",
    city:"",
    zipcode:0, 
  }
  

  constructor(private http:HttpClient){}

  getPropertyDetails():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/property/all`);
  }

  getAgentPropertyDetails(agentId:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties/${agentId}`);
  }

  setSelectedProperty(property: PropertyDetail):void {
    this.propertyDetail=property; 
  }

  setCategoryProperty(categoryProperty:Category):void{
    this.categoryProperties=categoryProperty;
  }
  getCategoryProperty():PropertyDetail{
    return this.categoryProperties;
  }

  editSelectedProperty(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${id}`)
  }
  getSelectedProperty():PropertyDetail{
    return this.propertyDetail;
  }
  

  deleteProperty(id: number):Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${id}`);
  }

  addProperty(formData: FormData,categoryId:number,agentId:number):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${categoryId}/${agentId}`,formData);  
  }

  updateProperty(formData: FormData,id:number,agentId:number) {
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties/${id}/${agentId}`,formData); 
  }
  getAllProperties():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/property/all`);
  }
  
}
