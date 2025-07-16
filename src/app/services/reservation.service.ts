import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

// Interface typée pour une réservation
export interface Reservation {
  _id: string;
  user?: {
    nom?: string;
    prenom?: string;
    email?: string;
    telephone?: string;
  };
  parking?: {
    name?: string;
  };
  car?: {
    licensePlate?: string;
  };
  startTime: string;
  endTime: string;
  status: string;
}

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private apiUrl = 'http://localhost:3000/api/reservation';

  constructor(private http: HttpClient) {}

  // ✅ Récupérer toutes les réservations
  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  // ✅ Annuler une réservation
  cancelReservation(id: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}/cancel`, {});
  }

  // ✅ Supprimer une réservation
  deleteReservation(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }
}
