import { Component, OnInit, Input, DoCheck } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Device } from '../../../../services/device';

@Component({
  selector: 'app-sonoff4ch',
  templateUrl: './sonoff4ch.component.html',
  styleUrls: ['./sonoff4ch.component.css']
})
export class Sonoff4chComponent implements OnInit, DoCheck {

  @Input() device: Device;
  deviceStateAll: Object;

  button1 = { power: true, text: 'OFF' , num: 1 };
  button2 = { power: true, text: 'OFF' , num: 2 };
  button3 = { power: true, text: 'OFF' , num: 3 };
  button4 = { power: true, text: 'OFF' , num: 4 };

  showInfo: Boolean = false;
  constructor(
    private http: HttpClient
  ) { }

  ngOnInit() {

  }
  ngDoCheck() {
    if (this.device.stat !== undefined &&
        this.device.stat.POWER2 !== undefined) {
          if (
              this.button1.power !== this.device.stat.POWER1 ||
              this.button2.power !== this.device.stat.POWER2 ||
              this.button3.power !== this.device.stat.POWER3 ||
              this.button4.power !== this.device.stat.POWER4 ) {
        this.checkState();
        }
    }
  }

  buttonToggle(button) {
    // this[button].power = !this[button].power;
    // this[button].text = (this[button].power) ? 'ON' : 'OFF';
    console.log(button);
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, { powerState: !button.power, ip: this.device.ip, channel: button.num }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }
  checkState() {
    this.button1.power = this.device.stat.POWER1;
    this.button2.power = this.device.stat.POWER2;
    this.button3.power = this.device.stat.POWER3;
    this.button4.power = this.device.stat.POWER4;
    this.button1.text = (this.button1.power) ? 'ON' : 'OFF';
    this.button2.text = (this.button2.power) ? 'ON' : 'OFF';
    this.button3.text = (this.button3.power) ? 'ON' : 'OFF';
    this.button4.text = (this.button4.power) ? 'ON' : 'OFF';
  }
}
