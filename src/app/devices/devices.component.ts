import { Component, OnInit, ErrorHandler } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device, DeviceData, Room } from '../services/device';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, interval } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material';
import { IntervalService } from '../services/interval.service';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})

export class DevicesComponent implements OnInit {

  form: FormGroup;
  deviceData$: Observable<DeviceData>;
  devices: Device[];
  rooms: Array<String> = new Array<String>();
  module_types: Array<String> = ['SONOFF_BASIC', 'SONOFF_TOUCH', 'SONOFF_4CH'];
  isOn: Boolean;
  openAddBox: Boolean = false;
  private formSubmitAttempt: boolean;
  delete: Boolean;
  deleteConfirm: Boolean;
  deviceName: String;
  deviceId: number;
  deviceEdit: Device;
  edit: boolean;
  constructor(
    private device_service: DeviceService,
    private _router: Router,
    public jwtHelper: JwtHelperService,
    private fb: FormBuilder,
    private http: HttpClient,
    public snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    this.getDeviceData();


    this.form = this.fb.group({
      device_name: ['', [Validators.required, Validators.maxLength(45)]],
      room_name: ['', [Validators.required, Validators.maxLength(45)]],
      module_type: ['', [Validators.required, Validators.maxLength(45)]],
      device_ip: ['', [Validators.required, Validators.maxLength(15)]],
      device_mac: ['', [Validators.required, Validators.maxLength(17)]],
    });
  }

  openBox() {
    console.log(this.openAddBox);
    this.openAddBox = !this.openAddBox;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.form.get(field).valid && this.form.get(field).touched) ||
      (this.form.get(field).untouched && this.formSubmitAttempt)
    );
  }

  addDevice() {
    if (this.form.valid) {
      const url = 'http://localhost:3000/devices/addDevice';
      this.http.post<any>(url, this.form.value)
        .subscribe(res => {
          this.snackBar.open('Device successfully added', 'Okay', { duration: 3000 });
          this.getDeviceData();
          this.formSubmitAttempt = false;
        }, error => {
          this.snackBar.open('Failed to Add Device', 'Okay', { duration: 3000 });
        });
    }
    this.formSubmitAttempt = true;

  }
  // intervalStart() {
  //   setInterval(this.DeviceStateAll, 1000);
  // }

  /*DeviceStateAll() {
    const url = 'http://localhost:3000/deviceState/ip';
    this.http.get<any>(url).subscribe(response => {
      //console.log(response);
    }, error => {
      console.log(error);
    });
    
  }*/

  deleteDevice(device) {
    this.delete = !this.delete;
    this.deviceName = device.device_name;
    this.deviceId = device.device_id;
  }

  confirmDelete(confirm) {
    if (confirm === true) {
      const url = `http://localhost:3000/devices/deleteDevice/${this.deviceId}`
      this.http.delete<any>(url)
        .subscribe(res => {
          console.log(res);
          this.snackBar.open('Device successfully deleted', 'Okay', { duration: 3000 });
          this.getDeviceData();
        }, error => {
          console.log(error);
        });
      this.delete = !this.delete;
    } else if (confirm === false) {
      this.delete = !this.delete;
    }
  }

  editDevice(device) {
    this.edit = !this.edit;
    this.deviceEdit = device;
    console.log(this.deviceEdit);
  }

  getDeviceData() {
    this.deviceData$ = this.device_service.getAllDevices();
    this.deviceData$.subscribe((res) => {
      this.devices = res.devices;
      res.rooms.forEach(room => {
        this.rooms.push(room.name);
      });
    });
  }
}
