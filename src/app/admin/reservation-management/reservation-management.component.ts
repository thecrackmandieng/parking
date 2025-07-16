import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { ReservationService } from '../../services/reservation.service';

@Component({
  selector: 'app-reservation-management',
  standalone: true,
  imports: [CommonModule, HeaderComponent, SidebarComponent],
  templateUrl: './reservation-management.component.html',
  styleUrls: ['./reservation-management.component.css']
})
export class ReservationManagementComponent implements OnInit {
  reservations: any[] = [];

  constructor(private reservationService: ReservationService) {}

  ngOnInit(): void {
    this.fetchReservations();
  }

  // ✅ Récupération des réservations
  fetchReservations(): void {
    this.reservationService.getReservations().subscribe({
      next: (data) => {
        this.reservations = data || [];
      },
      error: (err) => {
        console.error('Erreur de récupération des réservations :', err);
      }
    });
  }

  // ✅ Annulation d'une réservation
  cancelReservation(id: string): void {
    this.reservationService.cancelReservation(id).subscribe({
      next: (updated) => {
        if (updated && updated._id) {
          this.reservations = this.reservations.map(r =>
            r._id === updated._id ? updated : r
          );
          console.log('Réservation annulée avec succès.');
        }
      },
      error: (err) => {
        console.error('Erreur lors de l\'annulation :', err);
      }
    });
  }

  // ✅ Suppression d'une réservation avec confirmation native
  deleteReservation(id: string): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette réservation ?')) {
      this.reservationService.deleteReservation(id).subscribe({
        next: () => {
          this.reservations = this.reservations.filter(r => r._id !== id);
          console.log('Réservation supprimée avec succès.');
        },
        error: (err) => {
          console.error('Erreur lors de la suppression :', err);
        }
      });
    }
  }
}
