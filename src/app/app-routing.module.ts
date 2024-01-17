import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/common/login/login.component';
import { RegisterComponent } from './component/common/register/register.component';
import { HomeComponent } from './component/common/home/home.component';
import { AdminHomeComponent } from './component/admin/home/home.component';
import { authGuard } from './guard/auth.guard';
import { PropertiesComponent } from './component/common/properties/properties.component';
import { AddPropertyComponent } from './component/agent/add-property/add-property.component';
import { AgentsComponent } from './component/admin/agents/agents.component';
import { CustomerBookingsComponent } from './component/admin/customer-bookings/customer-bookings.component';
import { PropertyDetailsComponent } from './component/customer/property-details/property-details.component';
import { BookedPropertiesComponent } from './component/customer/booked-properties/booked-properties.component';
import { UpdatePropertyComponent } from './component/agent/update-property/update-property.component';
import { AgentPropertiesComponent } from './component/agent/agent-properties/agent-properties.component';
import { ApprovePropertyComponent } from './component/admin/approve-property/approve-property.component';
import { CategoryPropertiesComponent } from './component/common/category-properties/category-properties.component';


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
