import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { AnimationOptions } from 'ngx-lottie';
import { LoaderService } from './service/loader.service';
import { ActivatedRoute, Route } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  options: AnimationOptions = {
    path: '/assets/loading.json',
    rendererSettings: {
      className: 'lottie-loader',
    },
  };

  isAdmin: boolean = false;
  isAgent:boolean=false;
  isLoggedIn: boolean = false;
  router: any;

  constructor(
    private authService: AuthService,
    public loaderService: LoaderService,
    private route: ActivatedRoute
  ) {}
  ngOnInit(): void {
    this.authService.isAdmin$.subscribe((isAdmin) => {
      this.isAdmin = isAdmin;
    });
    this.authService.isAgent$.subscribe((isAgent)=>{
      this.isAgent=isAgent;
    })

    this.authService.isLoggedIn$.subscribe((isLoggedIn) => {
      this.isLoggedIn = isLoggedIn;
    });
  }

  isActive(routePath: string): boolean {
    return this.router.isActive(routePath, false);
  }

  logout(): void {
    this.authService.logout();
  }

  showSidebar = false; 

  toggleSidebar() {
    this.showSidebar = !this.showSidebar; 
  }
}
