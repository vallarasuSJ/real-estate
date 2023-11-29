import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { HomeComponent } from './component/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
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
import { CategoryPropertiesComponent } from './component/category-properties/category-properties.component';


const routes: Routes = [                                                                                                                                                                                                                                
  { path: '', component: HomeComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'admin', component: AdminHomeComponent, canActivate: [authGuard] },
  {path:'properties',component:PropertiesComponent},
  {path:'propertyDetails',component:PropertyDetailsComponent,  canActivate: [authGuard]},
  {path:'addProperty',component:AddPropertyComponent,  canActivate: [authGuard]},
  {path:'agents',component:AgentsComponent},
  {path:'customerBookings',component:CustomerBookingsComponent,  canActivate: [authGuard],},
  {path:'bookedProperties',component:BookedPropertiesComponent , canActivate: [authGuard]},
  {path:'user',component:UserPageComponent, canActivate: [authGuard]},
  {path:'agentPage',component:AgentPageComponent, canActivate: [authGuard]},
  {path:'updateProperty',component:UpdatePropertyComponent, canActivate: [authGuard]},
  {path:'agentProperties',component:AgentPropertiesComponent, canActivate: [authGuard]},
  {path:'approveProperty',component:ApprovePropertyComponent, canActivate: [authGuard]},
  {path:'categories',component:CategoryPropertiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
