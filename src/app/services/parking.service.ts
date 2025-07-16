import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParkingService {
  private apiUrl = 'http://localhost:3000/api/parking';

  constructor(private http: HttpClient) {}

  // Obtenir tous les parkings
  getParkings(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Ajouter un parking
  addParking(parkingData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, parkingData);
  }

  // Supprimer un parking
  deleteParking(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  // Obtenir les détails d’un parking
  getParkingById(id: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateParking(id: string, data: FormData): Observable<any> {
    return this.http.patch(`${this.apiUrl}/parking/${id}`, data);
  }

  blockParking(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/parking/${id}/block`, {});
  }
}
