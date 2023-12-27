import { Injectable } from '@angular/core';
import { AppUser } from '../model/appUser';
import { LoaderService } from './loader.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  //set logged user details in the local storage
  setLoggedInUser(user: AppUser): void {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
  }

  //get logged user details from the local storage
  public getLoggedInUser(): AppUser {
    return JSON.parse(localStorage.getItem('loggedInUser') || '{}');
  }

  //remove logged user from local storage
  public removeLoggedInUser(): void {
    localStorage.removeItem('loggedInUser');
  }

  //set the encrypted logged user in local storage
  setAuthData(authData: string) {
    localStorage.setItem('authData', authData);
  }

  //get the encrypted logged user in local storage
  public getAuthData(): string | null {
    return localStorage.getItem('authData');
  }
  //remove the encrypted logged user in local storage
  public removeAuthData():void{
    return localStorage.removeItem("authData");
  }
  
  //set routing path name in local storage
  public setRoute(route: string | null): void {
    if (route !== null) localStorage.setItem("route", route);
  }

  //get routing path name in local storage
  public getRoute(): string | null {
    return localStorage.getItem("route");
  }

  //remove routing path name in local storage
  public removeRoute(): void {
    localStorage.removeItem("route");
  }
}
