import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(public jwtHelper: JwtHelperService, private fb: FormBuilder, private http: HttpClient, public snackBar: MatSnackBar) { }

  form: FormGroup;
  username: String;
  email: String;
  role: String;

  // TODO add picture for users
  // picture: String;

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    this.username = payload.user;
    this.email = payload.email;
    this.role = payload.role;
    this.form = this.fb.group({
      username: [this.username, [Validators.required]],
      email: [this.email, [Validators.email, Validators.required]]

    });
  }

  /*
   *TODO form value when nothing change = "", "" , accept button must be disabled when user do no changes
   *make an http req to the server with new data and update db + refresh the token
 */

  changeUser() {
    console.log(this.form.value);
    const userChangeUrl = 'http://localhost:3000/user/userEdit';
    this.http.patch<any>(userChangeUrl, this.form.value)
      .subscribe(response => {
        this.email = this.form.value.email;
        this.username = this.form.value.username;
        sessionStorage.setItem('token', response.token);
      }, error => {
        this.snackBar.open('Failed to update: ' + error, 'Okay', { duration: 3000 });
      });
  }

}
