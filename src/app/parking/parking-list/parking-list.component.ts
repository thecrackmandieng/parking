import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { HeaderComponent } from '../../header/header.component';
import { ParkingService } from '../../services/parking.service';
import { ReservationService } from '../../services/reservation.service';

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
    private reservationService: ReservationService
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

  reserve(): void {
    if (this.selectedParking && this.selectedParking.availableSpots > 0) {
      // Exemple de payload minimal, à adapter selon ton backend
      const reservationPayload = {
        parkingId: this.selectedParking.id,
        startTime: new Date().toISOString(),
        endTime: new Date(new Date().getTime() + 60 * 60 * 1000).toISOString(), // +1h
        status: 'active',
      };

      this.reservationService.createReservation(reservationPayload).subscribe({
        next: (res) => {
          this.selectedParking!.availableSpots--;
          this.reservationConfirmed = true;
          alert('Réservation confirmée !');
        },
        error: (err) => {
          console.error('Erreur lors de la réservation', err);
          alert('Erreur lors de la réservation');
        }
      });
    }
  }

  onImageError(parking: Parking) {
    parking.imageUrl = 'assets/default.jpg';
  }
}
