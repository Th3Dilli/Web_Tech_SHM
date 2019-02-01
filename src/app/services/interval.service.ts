import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class IntervalService {

  constructor(
    private http: HttpClient
  ) { }

  DeviceStateAll(){
    const url = 'http://localhost:3000/deviceState/ip';
    return this.http.get<any>(url);
  }
}
