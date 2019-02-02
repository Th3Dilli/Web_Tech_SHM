import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../../../services/device';

@Component({
  selector: 'app-sonoff4ch',
  templateUrl: './sonoff4ch.component.html',
  styleUrls: ['./sonoff4ch.component.css']
})
export class Sonoff4chComponent implements OnInit {

  @Input() device: Device;
  deviceStateAll: Object;
  power: Boolean[] = [false, false, false, false];
  showInfo: Boolean = false;
  buttonText: String[] = ['OFF', 'OFF', 'OFF', 'OFF'];
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {
    // this.power = [this.device.stat.POWER1, this.device.stat.POWER2, this.device.stat.POWER3, this.device.stat.POWER4];
    console.log(this.device);
  }

  buttonToggle(index) {
    this.power[index] = !this.power[index];
    this.buttonText[index] = (this.power[index]) ? 'ON' : 'OFF';
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, { powerState: this.power[index], ip: this.device.ip, channel: index + 1 }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  checkState() {
    this.power = [this.device.stat.POWER1, this.device.stat.POWER2, this.device.stat.POWER3, this.device.stat.POWER4];
    for (let i = 0; i < 4; i++) {
      this.buttonText[i] = (this.power[i]) ? 'ON' : 'OFF';
    }
    console.log(this.device);
  }
}
