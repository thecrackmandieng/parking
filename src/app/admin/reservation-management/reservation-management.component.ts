import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-reservation-management',
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  reservations: any[] = []; // Remplacez "any" par une interface ou un type approprié

  ngOnInit(): void {
    // Logique pour charger les réservations
    this.reservations = [
      { id: 1, userId: 1, placeId: 1, date: '2023-10-01' },
      { id: 2, userId: 2, placeId: 2, date: '2023-10-02' }
    ];
  }

  deleteReservation(id: number): void {
    // Logique pour supprimer une réservation
    this.reservations = this.reservations.filter(reservation => reservation.id !== id);
  }
}
