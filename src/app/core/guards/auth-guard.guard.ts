import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = sessionStorage.getItem('userId');

  if (!userId) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
