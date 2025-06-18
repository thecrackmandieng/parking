import { Routes } from '@angular/router';

import { AccueilComponent } from './accueil/accueil/accueil.component';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ParkingListComponent } from './parking/parking-list/parking-list.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ParkingManagementComponent } from './admin/parking-management/parking-management.component';
import { PlaceManagementComponent } from './admin/place-management/place-management.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';

import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'accueil', pathMatch: 'full' },
  

  { path: 'accueil', component: AccueilComponent, title: 'Accueil' },
  { path: 'login', component: LoginComponent, title: 'Connexion' },
  { path: 'inscription', component: RegisterComponent, title: 'Inscription' }, // ✅ corrigé ici

  { path: 'parkings', component: ParkingListComponent, title: 'Liste des parkings' },
    {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { path: 'dashboard', component: DashboardComponent, title: 'Tableau de bord admin' },
      { path: 'parkings', component: ParkingManagementComponent, title: 'Gestion des parkings' },
      { path: 'places', component: PlaceManagementComponent, title: 'Gestion des places' },
      { path: 'reservations', component: ReservationManagementComponent, title: 'Gestion des réservations' },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  },

  { path: '**', redirectTo: 'accueil', title: 'Page non trouvée' }
];
