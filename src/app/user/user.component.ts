import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { formArrayNameProvider } from '@angular/forms/src/directives/reactive_directives/form_group_name';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public jwtHelper: JwtHelperService, private fb: FormBuilder ) { }
  
  form: FormGroup;
  username: String;
  email: String;
  role: String;

  // TODO add picture for users
  // picture: String;

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', [Validators.required]],
      email: ['', [Validators.email,Validators.required]]

    });
    const token = sessionStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    this.username = payload.user;
    this.email = payload.email;
    this.role = payload.role;
  }

   /*
    *TODO form value when nothing change = "", "" , accept button must be disabled when user do no changes
    *make an http req to the server with new data and update db + refresh the token 
  */
 
  changeUser(){
      console.log(this.form.value);

  }
 
}
