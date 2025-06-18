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
  login(username: string, password: string): Observable<{ isAuthenticated: boolean, role?: string, username?: string }> {
    // Simulation de délai réseau
    return of(null).pipe(
      delay(500),
      map(() => {
        const user = this.users.find(u => u.username === username && u.password === password);
        
        if (!user) {
          throw new Error('Identifiants incorrects');
        }
        return user;
      }),
      tap(user => this.setSession(user)),
      map(user => ({ 
        isAuthenticated: true,
        role: user.role,
        username: user.username
      })),
      catchError(error => {
        return of({ 
          isAuthenticated: false,
          message: error.message
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
          catchError(error => of({ 
            success: false, 
            message: error.message 
          }))
        );
    }
    
    // Validation simple du mot de passe
    if (password.length < 6) {
      return throwError(() => new Error('Le mot de passe doit contenir au moins 6 caractères'))
        .pipe(
          delay(500),
          catchError(error => of({ 
            success: false, 
            message: error.message 
          }))
        );
    }
    
    // Ajoute le nouvel utilisateur (simulation)
    const newUser = { 
      username, 
      password, 
      role: 'client' // Par défaut, nouveau utilisateur = client
    };
    this.users.push(newUser);
    
    // Crée automatiquement une session après inscription
    this.setSession(newUser);
    
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
    return this.getFromStorage('isLoggedIn') === 'true';
  }

  /**
   * Vérifie si l'utilisateur est admin
   */
  isAdmin(): boolean {
    return this.getFromStorage('userRole') === 'admin';
  }

  /**
   * Récupère le rôle de l'utilisateur
   */
  getUserRole(): string | null {
    return this.getFromStorage('userRole');
  }

  /**
   * Récupère le nom d'utilisateur
   */
  getUsername(): string | null {
    return this.getFromStorage('username');
  }

  // Méthodes privées pour gérer la session
  private setSession(user: { username: string, role: string }): void {
    this.setToStorage('isLoggedIn', 'true');
    this.setToStorage('userRole', user.role);
    this.setToStorage('username', user.username);
  }

  private clearSession(): void {
    ['isLoggedIn', 'userRole', 'username'].forEach(key => {
      this.removeFromStorage(key);
    });
  }

  // Méthodes helpers pour le localStorage
  private setToStorage(key: string, value: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, value);
    }
  }

  private getFromStorage(key: string): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  private removeFromStorage(key: string): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}