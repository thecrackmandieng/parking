import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Place {
  _id?: string;
  name: string;
  parkingId: number;
  isOccupied?: boolean;
  licensePlate?: string;
}

@Injectable({ providedIn: 'root' })
export class PlaceService {
  private apiUrl = 'http://localhost:3000/api/place';

  constructor(private http: HttpClient) {}

  getAllPlaces(): Observable<{ places: Place[] }> {
    return this.http.get<{ places: Place[] }>(this.apiUrl);
  }

  createPlace(place: { name: string; parkingId: number }): Observable<any> {
    return this.http.post(this.apiUrl, place);
  }
}
