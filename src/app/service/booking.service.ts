import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';
import { PropertyDetail } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class BookingService { 
  constructor(private http:HttpClient) { }

  getAllBookedProperties():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking/all`);
  }

  cancelBooking(id: number):Observable<AppResponse>{
   return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking/cancel/${id}`)   
  }

  bookProperty(propertyDetail: PropertyDetail) {
    console.log(propertyDetail);
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking`,propertyDetail);
  }


}
