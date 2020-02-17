import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Comment for module 'auth.guard.ts'.
 * routes authorization, user can only visit routes if the are authorized.
 * a user is authorized when the token in session storage is a valid JWT token.
 * @author Markus Macher
 */

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router, public snackBar: MatSnackBar) { }
  canActivate(): boolean {
    if (this._authService.isTokenExpired() === false) {
      return true;
    } else {
      this._authService.logoutSessionExpired();
      return false;
    }
  }

}


