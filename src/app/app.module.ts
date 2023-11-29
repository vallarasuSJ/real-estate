import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import player from 'lottie-web';
import { LottieModule } from 'ngx-lottie';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { LoaderInterceptorService } from './service/interceptor/loaderInterceptor.service';
import { AuthInterceptorService } from './service/interceptor/authInterceptor.service';
import { NavbarComponent } from './component/navbar/navbar.component';
import { PropertiesComponent } from './component/properties/properties.component';
import { AddPropertyComponent } from './component/add-property/add-property.component';
import { AgentsComponent } from './component/agents/agents.component';
import { CustomerBookingsComponent } from './component/customer-bookings/customer-bookings.component';
import { PropertyDetailsComponent } from './component/property-details/property-details.component';
import { BookedPropertiesComponent } from './component/booked-properties/booked-properties.component';
import { UserPageComponent } from './component/user-page/user-page.component';
import { AgentPageComponent } from './component/agent-page/agent-page.component';
import { UpdatePropertyComponent } from './component/update-property/update-property.component';
import { AgentPropertiesComponent } from './component/agent-properties/agent-properties.component';
import { ApprovePropertyComponent } from './component/approve-property/approve-property.component';
import { ToastPackage, ToastrModule } from 'ngx-toastr';
import { CategoryPropertiesComponent } from './component/category-properties/category-properties.component';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    AdminHomeComponent,
    NavbarComponent,
    PropertiesComponent,
    AddPropertyComponent,
    AgentsComponent,
    BookedPropertiesComponent,
    CustomerBookingsComponent,
    PropertyDetailsComponent,
    UserPageComponent,
    AgentPageComponent,
    UpdatePropertyComponent,
    AgentPropertiesComponent,
    ApprovePropertyComponent,
    CategoryPropertiesComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LottieModule.forRoot({ player: playerFactory }),
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptorService,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
