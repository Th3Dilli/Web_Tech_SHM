/**
 * Service for fetching the device statues from the back-end to the frond-end
 *
 * @author Phillip Freislich, Manuel Dielacher
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  constructor(
    private http: HttpClient
  ) { }

  DeviceStateAll() {
    const url = 'http://localhost:3000/deviceState/ip';
    return this.http.get<any>(url);
  }
}
