import { inject } from '@angular/core';
import { CanActivateFn,Router,ActivatedRouteSnapshot,RouterStateSnapshot } from '@angular/router';
export const authGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state:RouterStateSnapshot) => {
    const router = inject(Router);
  const loginVal = localStorage.getItem('loginStatus');
  
  if (loginVal === 'true') {
    return true;
  } else {
    // Redirect to login if not authenticated
    return router.parseUrl('/login');
  }
};
