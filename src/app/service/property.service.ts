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

  //retreives all properties from the server
  getPropertyDetails():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/property/all`);
  }

  //  Retrieves details of properties owned by a specific agent from the server.
  getAgentPropertyDetails(agentId:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties/${agentId}`);
  }
  
  //set the specific property object 
  setSelectedProperty(property: PropertyDetail):void {
    this.propertyDetail=property; 
  }

  //set the specific category property object 
  setCategoryProperty(categoryProperty:Category):void{
    this.categoryProperties=categoryProperty;
  }

  //retreives the selected category property object that had been set
  getCategoryProperty():PropertyDetail{
    return this.categoryProperties;
  }

  //retrieves the specific property details to be modified
  editSelectedProperty(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${id}`)
  }

  //retrieve the currently selected property detail
  getSelectedProperty():PropertyDetail{
    return this.propertyDetail;
  }
  
  //delete the selected property based on the ID
  deleteProperty(id: number):Observable<AppResponse> {
    return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${id}`);
  }

  //sending a post request to add a new property for specific category and agent
  addProperty(formData: FormData,categoryId:number,agentId:number):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/agent/property/${categoryId}/${agentId}`,formData);  
  }

  //Sending  a PUT request to update an existing property for a specific ID and agent
  updateProperty(formData: FormData,id:number,agentId:number) {
    return this.http.put<AppResponse>(`${urlEndpoint.baseUrl}/agent/properties/${id}/${agentId}`,formData); 
  }

  //retrieves all the properties from the server
  getAllProperties():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/property/all`);
  }
  
}
