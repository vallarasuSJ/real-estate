import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { HttpClient } from '@angular/common/http';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  
  constructor(private http:HttpClient) { }
   categoryId:number=0;

  getCategory():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/category/all`);
  }

  getCategoryProperties(id:number):Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/agent/category/${id}`);
  }

  setCategoryId(id: number) {
    this.categoryId=id;
  }

  getCategoryId(){
    return this.categoryId;
  }
}
