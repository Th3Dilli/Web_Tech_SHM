import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Device } from './device';

@Injectable({
  providedIn: 'root'
})
export class DeviceService {

  private _deviceRouteAll = "http://localhost:3000/devices/all";
  private _deviceRouteGetById = "http://localhost:3000/devices/detail/";


  constructor(private http: HttpClient, private router: Router) { }

  getAllDevices(): Observable<Device[]> {
    return this.http.get<Device[]>(this._deviceRouteAll);

  }

}







