import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import {AuthService} from './auth.service'
import { MatSnackBar } from '@angular/material';



@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {

  constructor(private _authService: AuthService, private router: Router, public snackBar: MatSnackBar )
  {}
  canActivate(): boolean{
    if (this._authService.isTokenExpired() === false) {
      console.log(this._authService.isTokenExpired())
      return true;
    }else{
    this._authService.logoutSessionExpired();
    return false;
  }
}

}


