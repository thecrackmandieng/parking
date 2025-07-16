import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../../header/header.component';
import { SidebarComponent } from '../../sidebar/sidebar.component';
import { PlaceService, Place } from '../../services/place.service';
import { SocketService } from '../../services/socket.service';

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
  places: Place[] = [];
  uniqueParkings: any[] = []; // Contiendra les parkings uniques (objets ou ids)
  selectedParkingId: string | null = null;

  newPlaceName = '';
  newParkingId: string | null = null;

  isBrowser: boolean;

  constructor(
    private placeService: PlaceService,
    private socketService: SocketService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    this.fetchPlaces();

    if (this.isBrowser) {
      this.listenToSocketEvents();
    }
  }

  fetchPlaces(): void {
    this.placeService.getAllPlaces().subscribe({
      next: (response: any) => {
        this.places = response.places ?? response ?? [];
        this.updateUniqueParkings();
      },
      error: (err) => console.error('❌ Erreur chargement places', err)
    });
  }

  createPlace(): void {
    if (!this.newPlaceName || this.newParkingId === null) return;

    this.placeService.createPlace({
      name: this.newPlaceName,
      parkingId: this.newParkingId
    }).subscribe({
      next: (newPlace) => {
        this.places.push(newPlace);
        this.updateUniqueParkings();
        this.newPlaceName = '';
        this.newParkingId = null;
      },
      error: (err) => console.error('❌ Erreur création place', err)
    });
  }

  updateUniqueParkings(): void {
    const parkings = this.places.map(p => p.parkingId);
    const seen = new Set();
    this.uniqueParkings = parkings.filter((p: any) => {
      const id = this.isObject(p) ? p._id : p;
      if (seen.has(id)) return false;
      seen.add(id);
      return true;
    });

    if (!this.selectedParkingId && this.uniqueParkings.length > 0) {
      this.selectedParkingId = this.isObject(this.uniqueParkings[0])
        ? this.uniqueParkings[0]._id
        : this.uniqueParkings[0];
    }
  }

  getFilteredPlaces(): Place[] {
    if (!this.selectedParkingId) return this.places;
    return this.places.filter(place => {
      const pid = this.isObject(place.parkingId) ? place.parkingId._id : place.parkingId;
      return pid === this.selectedParkingId;
    });
  }

  isObject(value: any): value is { _id: string; name: string } {
    return value && typeof value === 'object' && '_id' in value && 'name' in value;
  }

  onParkingSelect(): void {
    // Optionnel : action au changement
  }

  listenToSocketEvents(): void {
    this.socketService.onCarEntry().subscribe(data => {
      const place = this.places.find(p => p._id === data.placeId);
      if (place) {
        place.isOccupied = true;
        place.licensePlate = data.licensePlate;
      }
    });

    this.socketService.onCarExit().subscribe(data => {
      const place = this.places.find(p => p._id === data.placeId);
      if (place) {
        place.isOccupied = false;
        place.licensePlate = '';
      }
    });
  }
}
