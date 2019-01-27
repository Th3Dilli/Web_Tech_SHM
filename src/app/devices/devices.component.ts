import { Component, OnInit, ErrorHandler } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../services/device';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})

export class DevicesComponent implements OnInit {

  form: FormGroup;
  devices$: Observable<Device[]>;
  rooms: Set<String> = new Set;
  category: Set<String> = new Set;
  module_types: Array<String> = ['SONOFF_BASIC', 'SONOFF_RF', 'SONOFF_LED', 'SONOFF_4CH'];
  isOn: Boolean;
  openAddBox: Boolean = false;

  constructor(
                private device_service: DeviceService,
                private _router: Router,
                public jwtHelper: JwtHelperService,
                private fb: FormBuilder,
                private http: HttpClient
              ) { }

  ngOnInit() {
    this.devices$ = this.device_service.getAllDevices();
    this.devices$.subscribe((res) => {
      res.forEach(device => {
        this.rooms.add(device.name);
      });
      // console.log(this.rooms);
    });


    this.form = this.fb.group({
      device_name: ['', []],
      room_name: ['', []],
      category: ['', []],
      device_ip: ['', []],
      device_mac: ['', []],


    });
  }

  openBox() {
    console.log(this.openAddBox);
    this.openAddBox = !this.openAddBox;
  }

  addDevice() {
    console.log(this.form.value);
    const url = 'http://localhost:3000/device/addDevice';
    this.http.post<any>(url, this.form.value)
      .subscribe(res => {

      }, err => {


      });
  }

}














