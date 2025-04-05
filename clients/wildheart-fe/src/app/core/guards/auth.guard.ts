import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean | UrlTree> {
    return this.authService.currentUser$.pipe(
      map(user => {
        if (user) {
          // Check if route requires specific roles
          const requiredRoles = route.data['roles'] as string[];
          
          if (requiredRoles && requiredRoles.length > 0) {
            // Check if user has any of the required roles
            const hasRequiredRole = this.authService.hasAnyRole(requiredRoles);
            
            if (hasRequiredRole) {
              return true;
            } else {
              // User doesn't have required role, redirect to unauthorized page
              return this.router.createUrlTree(['/unauthorized']);
            }
          }
          
          // No specific roles required, user is authenticated
          return true;
        }
        
        // User is not authenticated, redirect to login page
        return this.router.createUrlTree(['/auth/login'], {
          queryParams: { returnUrl: state.url }
        });
      })
    );
  }
} 