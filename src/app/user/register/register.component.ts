import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule,Router } from '@angular/router';



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

  constructor(private fb: FormBuilder, private router: Router) {
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
    if (this.registerForm.invalid) return;

    const formData = this.registerForm.value;
    console.log('✅ Formulaire soumis avec succès :', formData);

    // TODO : Envoyer à l’API d’inscription ici
    this.router.navigate(['/login']);
  }
}
