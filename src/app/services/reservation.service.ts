import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

  getReservations(): Observable<Reservation[]> {
    return this.http.get<Reservation[]>(this.apiUrl);
  }

  cancelReservation(id: string): Observable<Reservation> {
    return this.http.patch<Reservation>(`${this.apiUrl}/${id}/cancel`, {});
  }

  deleteReservation(id: string): Observable<{ message: string }> {
    return this.http.delete<{ message: string }>(`${this.apiUrl}/${id}`);
  }

  createReservation(data: any): Observable<Reservation> {
    return this.http.post<Reservation>(this.apiUrl, data);
  }
}
