import { Component } from '@angular/core';
import { AuthService } from 'src/app/service/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})

export class UserPageComponent {
  constructor(
    private authService: AuthService,
  ) {}

  //logout function
  logout(): void {
    this.authService.logout();
  }

}
