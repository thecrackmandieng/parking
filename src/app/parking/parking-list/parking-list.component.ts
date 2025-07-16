import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from '../../header/header.component';
import { ParkingService } from '../../services/parking.service'; // Chemin ajusté
import { HttpClientModule } from '@angular/common/http';

interface Parking {
  id: number;
  name: string;
  location: string;
  capacity: number;
  availableSpots: number;
  imageUrl: string;
}

@Component({
  selector: 'app-parking-list',
  standalone: true,
  imports: [CommonModule, FormsModule, HeaderComponent, HttpClientModule],
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {
  parkings: Parking[] = [];
  searchTerm: string = '';
  selectedParking: Parking | null = null;
  reservationConfirmed = false;

  constructor(private parkingService: ParkingService) {}

  ngOnInit(): void {
    this.parkingService.getParkings().subscribe({
      next: (data: any[]) => {
        this.parkings = data.map(item => ({
          id: item.id,
          name: item.name,
          location: item.location,
          capacity: item.capacity,
          availableSpots: item.availableSpots,
          imageUrl: item.imageUrl || '../../../assets/default.jpg' // ou autre valeur par défaut
        }));
      },
      error: err => {
        console.error('Erreur lors du chargement des parkings :', err);
      }
    });
  }

  get filteredParkings(): Parking[] {
    if (!this.searchTerm) return this.parkings;
    return this.parkings.filter(p =>
      p.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      p.location.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  openDetails(parking: Parking) {
    this.selectedParking = parking;
    this.reservationConfirmed = false;
  }

  closeDetails() {
    this.selectedParking = null;
  }

  reserve() {
    if (this.selectedParking && this.selectedParking.availableSpots > 0) {
      this.selectedParking.availableSpots--;
      this.reservationConfirmed = true;
    }
  }
}
