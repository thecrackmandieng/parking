import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../../header/header.component';
import { ParkingService } from '../../services/parking.service';
import { ReservationService } from '../../services/reservation.service';
import { AuthService } from '../../services/auth.service'; // Ajoute cette ligne


interface Parking {
  id: string;
  name: string;
  location: string;
  capacity: number;
  availableSpots: number;
  imageUrl: string;
}

@Component({
  selector: 'app-parking-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, HeaderComponent],
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css'],
})
export class ParkingListComponent implements OnInit {
  parkings: Parking[] = [];
  searchTerm: string = '';
  selectedParking: Parking | null = null;
  reservationConfirmed: boolean = false;

  constructor(
    private parkingService: ParkingService,
    private reservationService: ReservationService,
    private authService: AuthService // Ajoute ici !

  ) {}

  ngOnInit(): void {
    this.loadParkings();
  }

  loadParkings(): void {
    this.parkingService.getParkings().subscribe({
      next: (data: any[]) => {
        this.parkings = data.map(item => ({
          id: item._id,
          name: item.name,
          location: item.location,
          capacity: item.capacity,
          availableSpots: item.availableSpots ?? item.capacity,
          imageUrl: item.image ? `http://localhost:3000/uploads/${item.image}` : 'assets/default.jpg',
        }));
      },
      error: (error) => {
        console.error('Erreur lors du chargement des parkings :', error);
      }
    });
  }

  get filteredParkings(): Parking[] {
    const term = this.searchTerm.trim().toLowerCase();
    return !term
      ? this.parkings
      : this.parkings.filter(p =>
          p.name.toLowerCase().includes(term) ||
          p.location.toLowerCase().includes(term)
        );
  }

  openDetails(parking: Parking): void {
    this.selectedParking = parking;
    this.reservationConfirmed = false;
  }

  closeDetails(): void {
    this.selectedParking = null;
  }
  detectedCarId: string = ''; // à mettre à jour dès que la caméra détecte une voiture


// ...existing code...
successMessage: string = ''; // Ajoute cette propriété

// ...existing code...
reserve(): void {
  if (this.selectedParking && this.selectedParking.availableSpots > 0) {
    const userId = this.authService.getUserId();

    const reservationPayload: any = {
      user: userId,
      parkingId: this.selectedParking.id,
      startTime: new Date().toISOString(),
      endTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(),
    };

    if (this.detectedCarId) {
      reservationPayload.car = this.detectedCarId;
    }

    this.reservationService.createReservation(reservationPayload).subscribe({
      next: (res) => {
        this.selectedParking!.availableSpots--;
        this.reservationConfirmed = true;
        this.successMessage = 'Réservation confirmée !';
        setTimeout(() => {
          this.closeDetails(); // Ferme le modal après 2 secondes
          this.successMessage = '';
        }, 2000);
      },
      error: (err) => {
        console.error('Erreur lors de la réservation', err);
        this.successMessage = '';
        alert('Erreur lors de la réservation');
      }
    });
  } else {
    alert('Aucune place disponible.');
  }
}
  // Gérer l'erreur de chargement de l'image

  onImageError(parking: Parking) {
    parking.imageUrl = 'assets/default.jpg';
  }
}
