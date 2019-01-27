import { Component, OnInit, Input } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Device } from '../../../../services/device';

@Component({
  selector: 'app-sonoffbasic',
  templateUrl: './sonoffbasic.component.html',
  styleUrls: ['./sonoffbasic.component.css']
})
export class SonoffbasicComponent implements OnInit {

  @Input() device: Device;
  isOn: Boolean;
  showInfo: Boolean;
  buttonText: String = 'OFF';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }

  buttonToggle() {
    this.isOn = !this.isOn;
    this.buttonText = (this.isOn) ? 'ON' : 'OFF';
    console.log();
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, {powerState: this.isOn, ip: this.device.ip, channel: 1}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

}
