import { Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ParkingListComponent } from './parking/parking-list/parking-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ParkingManagementComponent } from './admin/parking-management/parking-management.component';
import { PlaceManagementComponent } from './admin/place-management/place-management.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { adminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'parking', component: ParkingListComponent },
  {
    path: 'admin',
    canActivate: [adminGuard],
    children: [
      { path: 'dashboard', component:  DashboardComponent },
      { path: 'parking', component: ParkingManagementComponent },
      { path: 'places', component: PlaceManagementComponent },
      { path: 'reservations', component: ReservationManagementComponent },
    ]
  },
  { path: '**', redirectTo: '/login' } // Route par défaut pour les chemins non reconnus
];
