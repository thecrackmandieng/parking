import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'http://localhost:3000/api/dashboard'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  // Obtenir les statistiques du tableau de bord
  getDashboardStats(): Observable<{
    numberOfReservations: number,
    availableSpots: number,
    numberOfParkings: number
  }> {
    return this.http.get<{
      numberOfReservations: number,
      availableSpots: number,
      numberOfParkings: number
    }>(`${this.apiUrl}/stats`);
  }

  // Obtenir les données de réservations hebdomadaires
  getWeeklyReservations(): Observable<{ labels: string[], data: number[] }> {
    return this.http.get<{ labels: string[], data: number[] }>(`${this.apiUrl}/weekly-reservations`);
  }
}
