import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/api/parking'; // Assurez-vous que l'URL est correcte

  constructor(private http: HttpClient) { }

  // Obtenir tous les parkings
  getParkings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un nouveau parking
  addParking(parkingData: { name: string }): Observable<any> {
    return this.http.post(this.apiUrl, parkingData);
  }

  // Supprimer un parking
  deleteParking(parkingId: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${parkingId}`);
  }
}
