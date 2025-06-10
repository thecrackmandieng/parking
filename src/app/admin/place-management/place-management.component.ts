import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-place-management',
  templateUrl: './place-management.component.html',
  styleUrls: ['./place-management.component.css']
})
export class PlaceManagementComponent implements OnInit {
  places: any[] = []; // Remplacez "any" par une interface ou un type approprié

  ngOnInit(): void {
    // Logique pour charger les places
    this.places = [
      { id: 1, name: 'Place 1', parkingId: 1 },
      { id: 2, name: 'Place 2', parkingId: 1 }
    ];
  }

  addPlace(name: string, parkingId: number): void {
    // Logique pour ajouter une place
    this.places.push({ id: this.places.length + 1, name, parkingId });
  }

  deletePlace(id: number): void {
    // Logique pour supprimer une place
    this.places = this.places.filter(place => place.id !== id);
  }
}
