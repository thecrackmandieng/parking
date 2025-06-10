import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private users = [
    { username: 'client', password: 'client123', role: 'client' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  login(username: string, password: string): Observable<{ isAuthenticated: boolean, role?: string }> {
    const user = this.users.find(u => u.username === username && u.password === password);

    if (user) {
      return of({ isAuthenticated: true, role: user.role }).pipe(
        tap(() => {
          console.log('Utilisateur authentifié');
          if (typeof window !== 'undefined') {
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('userRole', user.role);
          }
        })
      );
    } else {
      return of({ isAuthenticated: false }).pipe(
        tap(() => {
          console.log('Échec de l\'authentification');
        })
      );
    }
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
    }
  }

  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }
}
