import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  private formSubmitAttempt: boolean;
  private failedLoginAttempt: boolean;
  private hide = true;


  constructor(private fb: FormBuilder, private _auth: AuthService, private _router: Router, public snackBar: MatSnackBar) { }

  ngOnInit() {
    this.form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]

    });
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  onSubmit() {
    if (this.form.valid) {
      console.log(this.form.value);
      this._auth.loginUser(this.form.value)
        .subscribe(res => {
          this._router.navigate(['/home']);
          this.loginSuccess();
        }, err => {
          this.failedLoginAttempt = true;  // login failed msg
        });
    }
    this.formSubmitAttempt = true;
  }

  loginSuccess() {
    this.snackBar.open('Successfully Logged In', 'Okay', { duration: 3000 });
  }

}
