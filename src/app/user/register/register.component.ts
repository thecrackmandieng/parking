import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  imports: [CommonModule, FormsModule],
  standalone: true,
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  password: string = '';
firstname: any;
lastname: any;

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    // Logique pour gérer l'inscription
    console.log('Registering user:', this.username);
    // Vous pouvez appeler un service ici pour gérer l'inscription
  }
}
