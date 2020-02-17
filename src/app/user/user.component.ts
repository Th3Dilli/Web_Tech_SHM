/**
 * The user component shows the user info and adds the ability to change the username and the email
 *
 * @author Markus Macher, Manuel Dielacher
 */

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  private formSubmitAttempt: boolean;


  constructor(public jwtHelper: JwtHelperService, private fb: FormBuilder, private http: HttpClient, public snackBar: MatSnackBar) { }

  form: FormGroup;
  username: String;
  email: String;
  role: String;

  /**
   * decodes the token payload of the user and displays the data in the UserComponent
   */
  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    this.username = payload.user;
    this.email = payload.email;
    this.role = payload.role;
    this.form = this.fb.group({
      username: [this.username, [Validators.required]],
      email: [this.email, [Validators.email, Validators.required, Validators.maxLength(255)]]

    });
  }

  /**
   * Check if a field is valid or not
   *
   * @param  field the field is the formControlName that will be checked if it is valid
   */
  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  /**
   * Check for valid input and
   * sends a http patch request to update the user info
   */
  changeUser() {
    if (this.form.valid) {
      const userChangeUrl = 'http://localhost:3000/user/userEdit';
      this.http.patch<any>(userChangeUrl, this.form.value)
        .subscribe(response => {
          this.email = this.form.value.email;
          this.username = this.form.value.username;
          sessionStorage.setItem('token', response.token);
          this.snackBar.open('Sucessfully changed', 'Okay', { duration: 3000 });
        }, error => {
          this.snackBar.open('Failed to update: ' + error, 'Okay', { duration: 3000 });
        });
    }
    this.formSubmitAttempt = true;
  }

}
