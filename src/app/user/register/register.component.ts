import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  registerForm: FormGroup;
  submitted = false;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private router: Router, private authService: AuthService) {
    this.registerForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      adresse: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      motDePasse: ['', [Validators.required, Validators.minLength(6)]],
      confirmMotDePasse: ['', Validators.required]
    }, { validator: this.passwordsMatchValidator });
  }

  // Vérifie que les mots de passe sont identiques
  passwordsMatchValidator(form: FormGroup) {
    const pwd = form.get('motDePasse')?.value;
    const confirmPwd = form.get('confirmMotDePasse')?.value;
    return pwd === confirmPwd ? null : { mismatch: true };
  }

onSubmit(): void {
  this.submitted = true;
  this.errorMessage = null;

  if (this.registerForm.invalid) {
    return;
  }

  const { confirmMotDePasse, ...formData } = this.registerForm.value;

  console.log('Données envoyées:', formData); // Ajoutez un log pour vérifier les données envoyées

  this.authService.register(formData).subscribe({
    next: (response) => {
      console.log('Inscription réussie', response);
      this.router.navigate(['/login']);
    },
    error: (error) => {
      console.error('Erreur lors de l\'inscription', error);
      this.errorMessage = error.error?.error || 'Une erreur est survenue lors de l\'inscription.';
    }
  });
}

}
