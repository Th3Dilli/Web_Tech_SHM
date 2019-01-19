import { Component, OnInit, ErrorHandler } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../services/device';
import { Router } from '@angular/router';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  typesOfdevices: Device[];
  editDevice: Device;

  constructor(private device_service: DeviceService, private _router: Router) { }

  ngOnInit() {
    this.getDevices();
  }

  getDevices(): void {
    this.device_service.getAllDevices()
      .subscribe(
        res => {
          this.typesOfdevices = res;
        }, err => {

        });
  }


}














