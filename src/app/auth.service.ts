import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { User } from './user';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { catchError, map } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  // checks if user is logged in
  private authUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loginUrl = "http://localhost:3000/login"
  private refreshLogin = "http://localhost:3000/login/refresh"

  constructor(private http: HttpClient, private router: Router, public jwtHelper: JwtHelperService, public snackBar: MatSnackBar) { }

  // navigation will be displayed on true
  get userLoggedIn() {
    return this.authUser.asObservable();
    
  }

  loginUser(user: Object): Observable<boolean> {
    console.log(user);
    return this.http.post<User>(this._loginUrl, user)
      .pipe(
        map(result => {
          console.log("test")
          sessionStorage.setItem("token", result.token);
          return true;
        }),
      );
  }

  logout() {
    this.router.navigate(["/login"]);
    this.authUser.next(false);
    sessionStorage.clear();
    localStorage.clear();
  }

  logoutSessionExpired() {
    this.router.navigate(["/login"]);
    this.authUser.next(false);
    this.snackBar.open('Your Session is expired, please login', "OK", { duration: 8000 });
    sessionStorage.clear();
    localStorage.clear();
  }

  logoutAuthenticationError(){
    this.router.navigate(["/login"]);
    this.authUser.next(false);
    this.snackBar.open('Authentication Error', "OK", { duration: 8000 });
    sessionStorage.clear();
    localStorage.clear();
  }

  // checks token is expired 
  isTokenExpired() {
    const token = sessionStorage.getItem('token');
    if (this.jwtHelper.isTokenExpired(token) === true) {
      return true;
    } else {
      this.authUser.next(true);
      return false;
    }
  }

  getToken() {
    return (sessionStorage.getItem('token'));
  }

  refreshToken(){
    return this.http.get<any>(this.refreshLogin)
  }


}
