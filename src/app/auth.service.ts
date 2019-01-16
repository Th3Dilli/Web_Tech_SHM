import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import {User} from './user';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  private authUser: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private _loginUrl = "http://localhost:3000/login"
  
  constructor(private http: HttpClient,  private router: Router) { }

  get userLoggedIn(){
    return this.authUser.asObservable();
  }

  loginUser(user: User){
    return this.http.post<any>(this._loginUrl, user)
  }

  loggedIn(){
    if(!!sessionStorage.getItem('token') === true){
      this.authUser.next(true);
    }
    return !!sessionStorage.getItem('token') // returns true or false...!!
  }
 
  logout (){
    this.router.navigate(["/login"]);
    this.authUser.next(false);
    sessionStorage.clear();
    localStorage.clear();
  }


}
