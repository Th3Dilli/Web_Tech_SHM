import { Component, OnInit, Input } from '@angular/core';
import { DevicesComponent } from '../devices.component';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device } from '../../services/device';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @Input() device: Device;
  isOn: Boolean;
  showInfo: Boolean;

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  buttonToggle() {
    this.isOn = !this.isOn;
    console.log();
    const params = new HttpParams().set('body', JSON.stringify({powerState: this.isOn, ip: this.device.ip}));
    const url = 'http://localhost:3000/toggleDevice';
    this.http.get(url, {params}).subscribe();
    console.log(params);
  }

  infoToggle() {
    this.showInfo = !this.showInfo;
  }
}
