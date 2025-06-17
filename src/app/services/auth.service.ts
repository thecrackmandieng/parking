import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { tap, delay, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Liste des utilisateurs simulés
  private users = [
    { username: 'client', password: 'client123', role: 'client' },
    { username: 'admin', password: 'admin123', role: 'admin' }
  ];

  /**
   * Méthode de connexion
   * @param username 
   * @param password 
   * @returns Observable avec le statut d'authentification et le rôle
   */
  login(username: string, password: string): Observable<{ isAuthenticated: boolean, role?: string }> {
    // Simulation de délai réseau
    return of(null).pipe(
      delay(500),
      tap(() => {
        // Recherche de l'utilisateur
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (!user) {
          throw new Error('Identifiants incorrects');
        }
      }),
      tap(() => {
        const user = this.users.find(u => u.username === username && u.password === password);
        if (user) {
          this.setSession(user);
        }
      }),
      map(() => {
        const user = this.users.find(u => u.username === username && u.password === password);
        return { 
          isAuthenticated: true, 
          role: user?.role 
        };
      }),
      catchError(error => {
        return of({ 
          isAuthenticated: false 
        });
      })
    );
  }

  /**
   * Méthode d'inscription
   * @param username 
   * @param password 
   * @returns Observable avec le statut de l'inscription
   */
  register(username: string, password: string): Observable<{ success: boolean, message?: string }> {
    // Vérifie si l'utilisateur existe déjà
    const userExists = this.users.some(u => u.username === username);
    
    if (userExists) {
      return throwError(() => new Error('Ce nom d\'utilisateur est déjà pris'))
        .pipe(
          delay(500),
          catchError(error => of({ success: false, message: error.message }))
        );
    }
    
    // Validation simple du mot de passe
    if (password.length < 6) {
      return throwError(() => new Error('Le mot de passe doit contenir au moins 6 caractères'))
        .pipe(
          delay(500),
          catchError(error => of({ success: false, message: error.message }))
        );
    }
    
    // Ajoute le nouvel utilisateur (simulation)
    this.users.push({ 
      username, 
      password, 
      role: 'client' // Par défaut, nouveau utilisateur = client
    });
    
    return of({ 
      success: true,
      message: 'Inscription réussie'
    }).pipe(delay(500));
  }

  /**
   * Déconnexion
   */
  logout(): void {
    this.clearSession();
  }

  /**
   * Vérifie si l'utilisateur est connecté
   */
  isLoggedIn(): boolean {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('isLoggedIn') === 'true';
    }
    return false;
  }

  /**
   * Récupère le rôle de l'utilisateur
   */
  getUserRole(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('userRole');
    }
    return null;
  }

  /**
   * Récupère le nom d'utilisateur
   */
  getUsername(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('username');
    }
    return null;
  }

  // Méthodes privées pour gérer la session
  private setSession(user: { username: string, role: string }): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('username', user.username);
    }
  }

  private clearSession(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('userRole');
      localStorage.removeItem('username');
    }
  }
}