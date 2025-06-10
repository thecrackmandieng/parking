import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

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
  imports: [CommonModule, FormsModule],
  templateUrl: './parking-list.component.html',
  styleUrls: ['./parking-list.component.css']
})
export class ParkingListComponent implements OnInit {
  parkings: Parking[] = [];
  searchTerm: string = '';

  selectedParking: Parking | null = null;
  reservationConfirmed = false;

  ngOnInit(): void {
    this.parkings = [
      { id: 1, name: 'Parking A', location: 'Dakar Centre', capacity: 100, availableSpots: 12, imageUrl: '../../../assets/vb.jpg' },
      { id: 2, name: 'Parking B', location: 'Plateau', capacity: 80, availableSpots: 0, imageUrl: '../../../assets/banniere.webp' },
      { id: 3, name: 'Parking C', location: 'Hann', capacity: 150, availableSpots: 75, imageUrl: '../../../assets/bm.jpg' },
      { id: 4, name: 'Parking D', location: 'Médina', capacity: 50, availableSpots: 5, imageUrl: '../../../assets/jaune.webp' },
      { id: 5, name: 'Parking E', location: 'Médina', capacity: 50, availableSpots: 50, imageUrl: '../../../assets/jaune.webp' }
    ];
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
