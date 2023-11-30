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
 
  customerBookings:CustomerBookings={
    propertyId:0,
    name:"",
    propertyName:"",
    address:"",
    city:"",
    zipcode:0,
    price:0,
    contactNumber:0,
    bookedTime:0,
  }
  

  constructor(private http:HttpClient) { }

  getCustomer():Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/customer/bookings/all`);
  }
  getAllCustomers():Observable<AppResponse> {
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/admin/customer/all`);
    
  }
}
