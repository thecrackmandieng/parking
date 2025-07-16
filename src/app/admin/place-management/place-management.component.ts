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
  uniqueParkingIds: number[] = [];
  selectedParkingId: number | null = null;

  newPlaceName = '';
  newParkingId: number | null = null;

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

    // ⚠️ Socket uniquement dans le navigateur (évite erreurs SSR)
    if (this.isBrowser) {
      this.listenToSocketEvents();
    }
  }

  /* ─────────── Récupération des places ─────────── */
  fetchPlaces(): void {
    this.placeService.getAllPlaces().subscribe({
      next: (data) => {
        this.places = Array.isArray(data) ? data : (data as any).places || [];
        this.updateParkingIds();
      },
      error: (err) => console.error('❌ Erreur chargement places', err)
    });
  }

  /* ─────────── Création de place ─────────── */
  createPlace(): void {
    if (!this.newPlaceName || this.newParkingId === null) return;

    this.placeService.createPlace({
      name: this.newPlaceName,
      parkingId: this.newParkingId
    }).subscribe({
      next: (newPlace) => {
        this.places.push(newPlace);
        this.updateParkingIds();
        this.newPlaceName = '';
        this.newParkingId = null;
      },
      error: (err) => console.error('❌ Erreur création place', err)
    });
  }

  /* ─────────── Mise à jour des parkings ─────────── */
  updateParkingIds(): void {
    if (!this.places || this.places.length === 0) {
      this.uniqueParkingIds = [];
      return;
    }

    this.uniqueParkingIds = [...new Set(this.places.map(p => p.parkingId))];
    if (this.selectedParkingId === null && this.uniqueParkingIds.length > 0) {
      this.selectedParkingId = this.uniqueParkingIds[0];
    }
  }

  getFilteredPlaces(): Place[] {
    return this.selectedParkingId === null
      ? this.places
      : this.places.filter(p => p.parkingId === this.selectedParkingId);
  }

  onParkingSelect(): void {
    // Optionnel si tu veux déclencher un comportement au changement
  }

  /* ─────────── Réception des événements temps réel ─────────── */
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
