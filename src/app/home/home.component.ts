import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username:String;
  userid : number;
  role :String;

  constructor(public jwtHelper: JwtHelperService) { }

  ngOnInit() {
    let token = sessionStorage.getItem("token");
    let payload = this.jwtHelper.decodeToken(token);
    console.log(payload);
    this.username = payload.user;
    this.userid = payload.userid;
    this.role = payload.role;

  }

}
