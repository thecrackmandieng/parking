import { CanActivateFn } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  // Logique de garde ici
  return true; // ou false en fonction de votre logique
};
