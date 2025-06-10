import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

export const adminGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const isLoggedIn = authService.isLoggedIn();
  const role = authService.getUserRole();

  if (isLoggedIn && role === 'admin') {
    return true;
  }

  router.navigate(['/login']);
  return false;
};
