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

  //Retrieves details of all properties booked by a specific user
  getAllBookedProperties(userId:number):Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking/${userId}`);
  }

  //Cancels the booking for a specific property based on the provided ID
  cancelBooking(id: number):Observable<AppResponse>{
   return this.http.delete<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking/cancel/${id}`)   
  }

  //books a property for the customer
  bookProperty(propertyDetail: PropertyDetail) {
    console.log(propertyDetail);
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/customer/booking`,propertyDetail);
  }


}
