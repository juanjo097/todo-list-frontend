import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const userId = sessionStorage.getItem('userId');

  // if the user is authenticated
  if (userId) {
    if (route.url[0].path === 'login') {
      router.navigate(['/dashboard']);
      return false;
    }
    return true;
  }
  // if not authenticated and trying to access the dashboard, redirect to the login
  if (route.url[0].path === 'dashboard') {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
