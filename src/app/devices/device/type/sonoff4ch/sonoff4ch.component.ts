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
  power: Boolean[] = [false, false, false, false];
  showInfo: Boolean = false;
  buttonText: String[] = ['OFF', 'OFF', 'OFF', 'OFF'];
  constructor(private http: HttpClient) { }

  ngOnInit() {
  }
  buttonToggle(index) {
    this.power[index] = !this.power[index];
    this.buttonText[index] = (this.power[index]) ? 'ON' : 'OFF';
    const url = 'http://localhost:3000/device/toggle';
    const channelN = 'Power' + (index + 1);
    this.http.patch<any>(url, {powerState: this.power[index], ip: this.device.ip, channel: index + 1}).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
}
