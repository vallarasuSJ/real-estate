import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';
import { StorageService } from 'src/app/service/storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent{

  role:String='';

  constructor(private authService:AuthService,private storageService:StorageService){
    this.role=this.storageService.getLoggedInUser().role;
  }
  
}
