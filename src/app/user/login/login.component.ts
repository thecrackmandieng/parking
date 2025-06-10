import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          console.log('Connexion réussie');
          // Redirigez en fonction du rôle de l'utilisateur
          if (response.role === 'admin') {
            this.router.navigate(['admin/dashboard']); // Route pour les administrateurs
          } else {
            this.router.navigate(['/parking']); // Route pour les clients
          }
        } else {
          console.log('Échec de la connexion');
          // Gérez l'échec de la connexion, par exemple, affichez un message d'erreur
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
      }
    });
  }
}
