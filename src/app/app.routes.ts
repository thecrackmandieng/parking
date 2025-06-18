import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { ParkingListComponent } from './parking/parking-list/parking-list.component';
import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { ParkingManagementComponent } from './admin/parking-management/parking-management.component';
import { PlaceManagementComponent } from './admin/place-management/place-management.component';
import { ReservationManagementComponent } from './admin/reservation-management/reservation-management.component';
import { AdminGuard } from './guards/admin.guard';
import { AuthGuard } from './guards/auth.guard';
import { AccueilComponent } from './accueil/accueil/accueil.component';



export const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'accueil', 
    pathMatch: 'full' 
  },
  { 
    path: 'accueil', 
    component: AccueilComponent,
    title: 'Accueil'
  },
  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Connexion',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    title: 'Inscription',
    canActivate: [AuthGuard] 
  },
  { 
    path: 'parkings',  // Changement de 'parking' à 'parkings' pour plus de cohérence
    component: ParkingListComponent,
    title: 'Liste des parkings'
  },
  {
    path: 'admin',
    canActivate: [AdminGuard],
    children: [
      { 
        path: 'dashboard', 
        component: DashboardComponent,
        title: 'Tableau de bord admin'
      },
      { 
        path: 'parkings',  // Changement de 'parking' à 'parkings'
        component: ParkingManagementComponent,
        title: 'Gestion des parkings'
      },
      { 
        path: 'places', 
        component: PlaceManagementComponent,
        title: 'Gestion des places'
      },
      { 
        path: 'reservations', 
        component: ReservationManagementComponent,
        title: 'Gestion des réservations'
      },
      { 
        path: '', 
        redirectTo: 'dashboard', 
        pathMatch: 'full' 
      }
    ]
  },
  { 
    path: '**', 
    redirectTo: 'accueil',
    title: 'Page non trouvée' 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })], // Ajout d'une option utile
  exports: [RouterModule]
})
export class AppRoutingModule { }