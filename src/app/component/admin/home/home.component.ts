import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class AdminHomeComponent {
  constructor(private authService:AuthService){}
  logout(): void {
    this.authService.logout();
  }
}
