import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Device, DeviceData } from './device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private _deviceRouteAll = 'http://localhost:3000/devices/all';

  constructor(private http: HttpClient, private router: Router) { }

  getAllDevices(): Observable<DeviceData> {
    return this.http.get<DeviceData>(this._deviceRouteAll);

  }

}







