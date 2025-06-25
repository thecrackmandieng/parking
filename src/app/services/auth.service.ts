import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/auth';
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  private isBrowser = typeof window !== 'undefined'; // ✅ Détection environnement navigateur

  private http = inject(HttpClient); // ✅ bonne pratique Angular 18+

  constructor() {
    // Vérifiez si l'utilisateur est déjà authentifié (seulement côté navigateur)
    if (this.isBrowser) {
      this.isAuthenticatedSubject.next(!!this.getToken());
    }
  }

  // Inscription
  register(userData: {
    nom: string,
    prenom: string,
    adresse: string,
    email: string,
    motDePasse: string,
    role?: string
  }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, userData);
  }

  // Connexion
  login(credentials: { email: string, motDePasse: string }): Observable<{ token: string, role: string }> {
    return this.http.post<{ token: string, role: string }>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (this.isBrowser) {
          localStorage.setItem('token', response.token);
        }
        this.isAuthenticatedSubject.next(true);
      })
    );
  }

  // Déconnexion
  logout(): void {
    if (this.isBrowser) {
      localStorage.removeItem('token');
    }
    this.isAuthenticatedSubject.next(false);
  }

  // Vérifier si l'utilisateur est authentifié
  isAuthenticated(): boolean {
    return this.isAuthenticatedSubject.value;
  }

  // Obtenir le token
  getToken(): string | null {
    if (!this.isBrowser) return null;
    return localStorage.getItem('token');
  }

  // Obtenir le rôle depuis le token
  getUserRole(): string | null {
    const token = this.getToken();
    if (!token) return null;

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.role || null;
    } catch (e) {
      return null;
    }
  }
}
