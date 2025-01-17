/**
 * Home screen for the user with additional navigation cards to the devices or the user component
 *
 * @author Markus Macher
 */

import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { DeviceService } from '../services/device.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  username: String;
  email: String;
  userid: number;
  role: String;
  date_now: String;
  time_now: String;
  resultlength: Number;
  constructor(public jwtHelper: JwtHelperService, private device_service: DeviceService) { }

  ngOnInit() {
    const token = sessionStorage.getItem('token');
    const payload = this.jwtHelper.decodeToken(token);
    this.username = payload.user;
    this.email = payload.email;
    this.userid = payload.userid;
    this.role = payload.role;
    this.getDeviceLength();
    setInterval(() => {
      this.getTime();
    }, 120);
  }

  /**
   * Displays the local time on the home component
   */
  getTime() {
    this.time_now = new Date().toLocaleTimeString();
    this.date_now = new Date().toLocaleDateString();
  }

  /**
   * Shows the amount of devices
   */
  getDeviceLength() {
    this.device_service.getAllDevices()
      .subscribe(
        res => this.resultlength = res.devices.length
      );
  }



}
