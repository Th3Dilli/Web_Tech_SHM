import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { tap, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material/snack-bar';

/**
 * Comment for module 'auth.service.ts'.
 * provides the user authentication methods
 * login(), logout() and token check isTokenExpired()
 * token expiration is set to 1h
 * @author Markus Macher
 */


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // backend route for login
  private _loginUrl = 'http://localhost:3000/login';

  // Navigation menu is hidden on false | displayed on true
  private authUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService, public snackBar: MatSnackBar) { }

  // returns a Observable based on the emitted Event from authUser (true, false).
  get userLoggedIn() {
    return this.authUser.asObservable();

  }
  /* loginUser() returns an Observable.
   * pipe() pipes the obsersable to the tap operator
   * tap() perfoms action based on response; saving the response token.
   * result = token saved in session storage.
   */
  loginUser(user: Object) {
    return this.http.post<User>(this._loginUrl, user)
      .pipe(
        tap(result => {
          sessionStorage.setItem('token', result.token);
        })
      );
  }
  /* on logout() the user is navigated to the login page.
   * authUser.next(false) hides the navigation menu.
   * token is removed from sessionStorage.
  */
  logout() {
    this.router.navigate(['/login']);
    this.authUser.next(false);
    sessionStorage.clear();
  }

  // auto logout if token is expired.
  logoutSessionExpired() {
    this.router.navigate(['/login']);
    this.authUser.next(false);
    this.snackBar.open('Your Session is expired, please login', 'OK', { duration: 8000 });
    sessionStorage.clear();
  }

  // auto logout if authentication error 401 occurs.
  logoutAuthenticationError() {
    this.router.navigate(['/login']);
    this.authUser.next(false);
    this.snackBar.open('Authentication Error', 'OK', { duration: 8000 });
    sessionStorage.clear();
  }

  /* checks if the token is expired
   * this method is provided for the auth.guard.ts
  */
  isTokenExpired() {
    const token = sessionStorage.getItem('token');
    try {
      if (this.jwtHelper.isTokenExpired(token) === true) {
        return true;
      } else {
        this.authUser.next(true);
        return false;
      }
    } catch {
      console.log('Invalid Token');
    }
  }

  // returns the token from session storage.
  getToken() {
    return (sessionStorage.getItem('token'));
  }
}
