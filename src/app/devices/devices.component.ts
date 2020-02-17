/**
 * Root component for the devices
 *
 * @author Markus Macher, Manuel Dielacher, Philipp Freislich
 */

import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device, DeviceData } from '../services/device';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';
import { IntervalService } from '../services/interval.service';
import { DevicesStats } from '../services/interval';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})

export class DevicesComponent implements OnInit, OnDestroy {

  addDeviceForm: FormGroup;
  editDeviceForm: FormGroup;
  deleteRoomForm: FormGroup;
  addRoomForm: FormGroup;
  deviceData$: Observable<DeviceData>;
  devices: Device[];
  deviceStats: DevicesStats;
  rooms: Array<String> = new Array<String>();
  module_types: Array<String> = ['SONOFF_BASIC', 'SONOFF_TOUCH', 'SONOFF_4CH'];
  isOn: Boolean;
  openAddBox: Boolean = false;
  formSubmitAttempt: boolean;
  delete: Boolean;
  deleteConfirm: Boolean;
  deviceName: String;
  deviceId: number;
  deviceEdit: Device;
  edit: Boolean = false;

  intervalHandle: any;

  showRoomSetting: boolean;

  constructor(
    private device_service: DeviceService,
    private _router: Router,
    public jwtHelper: JwtHelperService,
    private fb: FormBuilder,
    private http: HttpClient,
    public snackBar: MatSnackBar,
    private intervalS: IntervalService
  ) { }

  /**
   * get the devices info with the devices.service
   * and get the device statuses info
   *
   * start the interval for updating the device statuses every second
   */
  ngOnInit() {
    this.getDeviceData();
    this.deviceData$.subscribe(() => {
      this.getDevicesStats();
    });

    this.intervalHandle = setInterval(() => {
      this.getDevicesStats();
    }, 1000);

    this.addDeviceForm = this.fb.group({
      device_name: ['', [Validators.required, Validators.maxLength(45)]],
      room_name: ['', [Validators.required, Validators.maxLength(45)]],
      module_type: ['', [Validators.required, Validators.maxLength(45)]],
      device_ip: ['', [Validators.required, Validators.maxLength(15)]],
      device_mac: ['', [Validators.required, Validators.maxLength(17)]],
    });

    this.deleteRoomForm = this.fb.group({
      room_name: ['', [Validators.required, Validators.maxLength(45)]],
    });

    this.addRoomForm = this.fb.group({
      room_name: ['', [Validators.required, Validators.maxLength(45)]],
    });

  }

  /**
   * terminate the interval after leaving the device component
   */
  ngOnDestroy() {
    clearInterval(this.intervalHandle);
  }

  /**
   * addDevice box toggle
   */
  openBox() {
    this.openAddBox = !this.openAddBox;
  }

  isFieldInvalid(field: string) {
    return (
      (!this.addDeviceForm.get(field).valid && this.addDeviceForm.get(field).touched) ||
      (this.addDeviceForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  /**
   * addDevice
   * check if valid input and send a http post request to the server
   * with the device data from the form as body
   * updated with getDeviceData the displayed devices
   */
  addDevice() {
    if (this.addDeviceForm.valid) {
      this.openAddBox = !this.openAddBox;
      const url = 'http://localhost:3000/devices/addDevice';
      this.http.post<any>(url, this.addDeviceForm.value)
        .subscribe(res => {
          this.snackBar.open('Device successfully added', 'Okay', { duration: 3000 });
          this.getDeviceData();
          this.formSubmitAttempt = false;
        }, error => {
          this.snackBar.open('Failed to Add Device', 'Okay', { duration: 3000 });
        });
    }
    this.formSubmitAttempt = true;
    this.addDeviceForm.reset();
  }

  /**
   * store the device info for the devie that should be deleted
   *
   * @param device device that should be deleted, will be emitted from the child component
   */
  deleteDevice(device) {
    this.delete = !this.delete;
    this.deviceName = device.device_name;
    this.deviceId = device.device_id;
  }

  /**
   * After confirmation the device will be permanetly delete from the database
   * getDeviceData is called to updated the displayed devices
   *
   * @param confirm bool that tell if the device should be deleted
   */
  confirmDelete(confirm) {
    if (confirm === true) {
      const url = `http://localhost:3000/devices/deleteDevice/${this.deviceId}`;
      this.http.delete<any>(url)
        .subscribe(res => {
          this.snackBar.open('Device successfully deleted', 'Okay', { duration: 3000 });
          this.getDeviceData();
        }, error => {
          this.snackBar.open('Failed to delete device', 'Okay', { duration: 3000 });
        });
      this.delete = !this.delete;
    } else if (confirm === false) {
      this.delete = !this.delete;
    }
  }

  /**
   * Gets the device from the child component where the button was pressed
   *
   * @param device device data emitted form child component
   */
  editDevice(device) {
    this.edit = !this.edit;
    this.deviceEdit = device;
    if (this.edit) {
      this.editDeviceForm = this.fb.group({
        editDevice_id: [this.deviceEdit.device_id, [Validators.required]],
        editDevice_name: [this.deviceEdit.device_name, [Validators.required, Validators.maxLength(45)]],
        editDevice_ip: [this.deviceEdit.ip, [Validators.required, Validators.maxLength(15)]],
        editDevice_mac: [this.deviceEdit.mac, [Validators.required, Validators.maxLength(17)]]
      });
    } else {
      this.editDeviceForm = null;
    }

  }

  /**
   * On save button the device will be updated in the database
   * sends the data from the form via body to the server
   *
   */
  editDeviceUpdate() {
    if (this.editDeviceForm.valid) {
      this.edit = !this.edit;
      const url = `http://localhost:3000/devices/edit`;
      this.http.patch<any>(url, this.editDeviceForm.value)
        .subscribe(res => {
          this.snackBar.open('Device successfully updated', 'Okay', { duration: 3000 });
          this.getDeviceData();
        }, error => {
          this.snackBar.open(error, 'Okay', { duration: 3000 });
        });
    }
  }

  /**
   * Get all devices with the device service and set up
   * the rooms Array to be displayed as a navigation with its devices
   */
  getDeviceData() {
    this.deviceData$ = this.device_service.getAllDevices();
    this.deviceData$.subscribe((res) => {
      this.devices = res.devices;
      this.rooms = new Array<String>();
      res.rooms.forEach(room => {
        this.rooms.push(room.name);
      });
    });
  }

  /**
   * get all devices statuses info ON/OFF
   * and set the statuses info foreach device in the stat property of the device
   */
  getDevicesStats() {
    this.deviceData$.subscribe(() => {
      this.intervalS.DeviceStateAll().subscribe(data => {
        this.deviceStats = data;
        for (let i = 0; i < this.devices.length; i++) {
          this.devices[i].stat = data.devices[this.devices[i].ip];
        }
      });
    });
  }

/**
 * Show the room edit overlay
 */
  showRoomSettings() {
    this.showRoomSetting = !this.showRoomSetting;
  }

  /**
   * delete a room
   */
  deleteRoom() {
    if (this.deleteRoomForm.valid) {
      this.showRoomSetting = !this.showRoomSetting;
      const url = 'http://localhost:3000/room/deleteRoom';
      this.http.patch<any>(url, this.deleteRoomForm.value)
        .subscribe(res => {
          this.snackBar.open('Room deleted', 'Okay', { duration: 3000 });
          this.getDeviceData();
        }, err => {
          this.snackBar.open(err, 'Okay', { duration: 3000 });
        });
    }
    this.deleteRoomForm.reset();
  }

/**
 * add a room
 */
  addRoom() {
    if (this.addRoomForm.valid) {
      this.showRoomSetting = !this.showRoomSetting;
      const url = 'http://localhost:3000/room/addRoom';
      this.http.post<any>(url, this.addRoomForm.value)
        .subscribe(res => {
          this.snackBar.open('Room added', 'Okay', { duration: 3000 });
          this.getDeviceData();
        }, err => {
          this.snackBar.open(err, 'Okay', { duration: 3000 });
        });
    }
    this.addRoomForm.reset();
  }


}

