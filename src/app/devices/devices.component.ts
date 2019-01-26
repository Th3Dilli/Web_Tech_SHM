import { Component, OnInit, ErrorHandler } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { Device } from '../services/device';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css'],
})

export class DevicesComponent implements OnInit {

  devices$: Observable<Device[]>;
  rooms: Set<String> = new Set;
  isOn: Boolean;

  constructor(private device_service: DeviceService, private _router: Router, public jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.devices$ = this.device_service.getAllDevices();
    this.devices$.subscribe((res) => {
      res.forEach(device => {
        this.rooms.add(device.name);
      });
      // console.log(this.rooms);
    });
  }

}














