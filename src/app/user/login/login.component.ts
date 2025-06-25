import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    this.authService.login(this.username, this.password).subscribe({
      next: (response) => {
        if (response.isAuthenticated) {
          if (response.role === 'admin') {
            this.router.navigate(['admin/dashboard']);
          } else {
            this.router.navigate(['/parkings']); // Redirection immédiate sans message
          }
        } else {
          alert('Échec de la connexion. Vérifiez vos identifiants.');
        }
      },
      error: (error) => {
        console.error('Erreur de connexion', error);
        alert('Une erreur est survenue. Veuillez réessayer plus tard.');
      }
    });
  }
}