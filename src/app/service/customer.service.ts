import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CustomerBookings } from '../model/customer-bookings';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {
 

  constructor(private http:HttpClient) { }

  //Retrieves details of all bookings made by customers.
  getCustomerBookings():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/customer/bookings/all`);
  }
  
  //Retrieves details of all customers.
  getAllCustomers():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/customer/all`);
    
  }
}
