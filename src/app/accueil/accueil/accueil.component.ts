import { Component } from '@angular/core';

@Component({
  selector: 'app-accueil',
  standalone:true,
  
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.css']
})
export class AccueilComponent {
  onSignUp() {
    console.log("Inscription cliquée");
    // Ajoutez ici la logique pour l'inscription
  }

  onLogin() {
    console.log("Connexion cliquée");
    // Ajoutez ici la logique pour la connexion
  }
}