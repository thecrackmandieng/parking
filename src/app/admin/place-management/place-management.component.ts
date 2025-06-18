import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from "../../sidebar/sidebar.component";

@Component({
  selector: 'app-place-management',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HeaderComponent,
    SidebarComponent
  ],
  templateUrl: './place-management.component.html',
  styleUrls: ['./place-management.component.css']
})
export class PlaceManagementComponent implements OnInit {
  places: any[] = [];
  selectedParkingId: number | null = null;
  uniqueParkingIds: number[] = [];
  licensePlates: { [key: number]: string } = {
    1: 'ABC123',
    4: 'XYZ789',
    6: 'DEF456'
  };

  ngOnInit(): void {
    this.places = [
      { id: 1, name: 'Place 1', parkingId: 1, isOccupied: true },
      { id: 2, name: 'Place 2', parkingId: 1, isOccupied: false },
      { id: 3, name: 'Place 3', parkingId: 1, isOccupied: true },
      { id: 4, name: 'Place 4', parkingId: 1, isOccupied: true },
      { id: 5, name: 'Place 5', parkingId: 3, isOccupied: false },
      { id: 6, name: 'Place 6', parkingId: 3, isOccupied: true },
    ];
    this.uniqueParkingIds = [...new Set(this.places.map(place => place.parkingId))];
    // Initialiser selectedParkingId avec le premier parking ID
    this.selectedParkingId = this.uniqueParkingIds.length > 0 ? this.uniqueParkingIds[0] : null;
  }

  addPlace(name: string, parkingId: number): void {
    this.places.push({ id: this.places.length + 1, name, parkingId, isOccupied: false });
    this.uniqueParkingIds = [...new Set(this.places.map(place => place.parkingId))];
  }

  onParkingSelect(): void {
    // Cette méthode est appelée lorsque la sélection change, mais la logique de filtrage est déjà gérée par getFilteredPlaces
  }

  getFilteredPlaces(): any[] {
    if (this.selectedParkingId === null) {
      return this.places;
    } else {
      return this.places.filter(place => place.parkingId === this.selectedParkingId);
    }
  }
}
