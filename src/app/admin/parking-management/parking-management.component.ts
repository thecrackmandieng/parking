import { Component, OnInit } from '@angular/core';
import { HeaderComponent } from "../../header/header.component";
import { SidebarComponent } from "../../sidebar/sidebar.component";
import { FormsModule } from '@angular/forms'; // Import FormsModule for ngModel
import { CommonModule } from '@angular/common'; // Import CommonModule for ngIf, ngFor, etc.
import { RouterModule } from '@angular/router'; // Import RouterModule for navigation

@Component({
  selector: 'app-parking-management',
  standalone: true,
  templateUrl: './parking-management.component.html',
  styleUrls: ['./parking-management.component.css'],
  imports: [HeaderComponent, SidebarComponent, FormsModule, CommonModule, RouterModule]
})
export class ParkingManagementComponent implements OnInit {
  parkings: any[] = []; // Remplacez "any" par une interface ou un type approprié

  ngOnInit(): void {
    // Logique pour charger les parkings
    this.parkings = [
      { id: 1, name: 'Parking A' },
      { id: 2, name: 'Parking B' }
    ];
  }

  addParking(name: string): void {
    // Logique pour ajouter un parking
    this.parkings.push({ id: this.parkings.length + 1, name });
  }

  deleteParking(id: number): void {
    // Logique pour supprimer un parking
    this.parkings = this.parkings.filter(parking => parking.id !== id);
  }
}
