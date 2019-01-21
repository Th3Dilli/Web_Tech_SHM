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

  typesOfdevices$: Observable<Device[]>

  constructor(private device_service: DeviceService, private _router: Router, public jwtHelper: JwtHelperService) { }

  ngOnInit() {
    this.typesOfdevices$ = this.device_service.getAllDevices();
  }

  getRole() {
    let token = sessionStorage.getItem("token");
    let payload = this.jwtHelper.decodeToken(token);
    return payload.role
  }

}














