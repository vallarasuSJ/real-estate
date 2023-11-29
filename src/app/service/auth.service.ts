import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CONSTANT, urlEndpoint } from '../utils/constant';
import { Login } from '../model/login';
import { BehaviorSubject, Observable, Observer, map } from 'rxjs';
import { AppResponse } from '../model/appResponse';
import { StorageService } from './storage.service';
import { AppUser } from '../model/appUser';
import { Register } from '../model/register';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private isAdminSubject = new BehaviorSubject<boolean>(false);
  private isAgentSubject= new BehaviorSubject<boolean>(false);
  private isLoggedInSubject = new BehaviorSubject<boolean>(false);

  isAdmin$: Observable<boolean> = this.isAdminSubject.asObservable();
  isAgent$:Observable<boolean>=this.isAgentSubject.asObservable();
  isLoggedIn$: Observable<boolean> = this.isLoggedInSubject.asObservable();

  constructor(
    private router: Router,
    private http: HttpClient,
    private storageService: StorageService
  ) {
    if (storageService.getLoggedInUser().id != null) {
      this.setLoggedIn(storageService.getLoggedInUser());
    }
  }

  login(login: Login): Observable<AppResponse> {
    return this.http
      .post<AppResponse>(`${urlEndpoint.baseUrl}/auth/login`, login)
      .pipe(
        map((user) => {
          this.storageService.setAuthData(
            window.btoa(login.username + ':' + login.password)
          );
        
          return user;
        })
      );
  }

  logout() {
    this.storageService.removeAuthData();
    this.isAdminSubject.next(false);
    this.isAgentSubject.next(false);
    this.isLoggedInSubject.next(false);
    this.storageService.removeLoggedInUser();
    this.router.navigate(['/'], { replaceUrl: true });
  }

  isAdmin(): boolean {
    return this.isAdminSubject.value;
  }

  isAgent():boolean{
    return this.isAgentSubject.value;
  }

  isLoggedIn(): boolean {
    return this.isLoggedInSubject.value;
  }

  setLoggedIn(user: AppUser): void {
    this.storageService.setLoggedInUser(user);
    this.isLoggedInSubject.next(true);
    let route: string | null = this.storageService.getRoute();
    if (user.role === CONSTANT.USER) {
      this.router.navigate(["/"], { replaceUrl: true });
    } else if (user.role === CONSTANT.ADMIN) {
      this.isAdminSubject.next(true);
      this.router.navigate(["/"], { replaceUrl: true });
    }
    else if (user.role === CONSTANT.AGENT) {
      this.isAgentSubject.next(true);
      this.router.navigate(["/"], { replaceUrl: true });
    }
  }

  register(register: Register):Observable<AppResponse> {
    console.log(register);
    return this.http.post<AppResponse>(`${urlEndpoint.baseUrl}/auth/register`,register);
  }
  getRole() :Observable<AppResponse>{
    return this.http.get<AppResponse>(`${urlEndpoint.baseUrl}/auth/role`);
    
  }
}
