import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../../../services/device';

@Component({
  selector: 'app-sonoffbasic',
  templateUrl: './sonoffbasic.component.html',
  styleUrls: ['./sonoffbasic.component.css']
})
export class SonoffbasicComponent implements OnInit, DoCheck {

  @Input() device: Device;
  isOn: Boolean;
  showInfo: Boolean;
  buttonText: String = 'OFF';

  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  ngDoCheck() {
    if (this.device.stat !== undefined && this.isOn !== this.device.stat.POWER1) {
      this.checkState();
    }
  }

  buttonToggle() {
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, { powerState: !this.isOn, ip: this.device.ip, channel: 1 }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  checkState() {
    this.isOn = this.device.stat.POWER1;
    this.buttonText = (this.isOn) ? 'ON' : 'OFF';
  }
}
