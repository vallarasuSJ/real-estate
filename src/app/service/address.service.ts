import { Injectable } from '@angular/core';
import { Address } from '../model/address';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { urlEndpoint } from '../utils/constant';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
 

  constructor(private http:HttpClient) { }

  createAddress(addAddress: Address):Observable<AppResponse> {
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/agent/address`,addAddress);
  }
}
