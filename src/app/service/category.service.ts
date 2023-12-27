import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';
import { Category } from '../model/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http:HttpClient) { }
   categoryId:number=0;

   //retrieves all categories from server
  getCategory():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/category/all`);
  }

  //retrieves all categories and their properties from server
  getCategoryProperties(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/category/${id}`);
  }
  
  //set category id
  setCategoryId(id: number) {
    this.categoryId=id;
  }

  //get category id to retrieve the respective properties
  getCategoryId(){
    return this.categoryId;
  }
}
