/**
 * This holds all the relevant information for a specific device => SONOFF_4Ch
 * it has 4 channels so all those need to be accessible with a button and the button needs
 * to show the current state of that channel
 *
 * @author Manuel Dielacher, Philipp Freislich
 */

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

  /**
   * Checks the state from the device.state property against the current
   * if they are different call checkState
   */
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

  /**
   * do a http patch reqest to update the device through the server
   * the button state will update automaticaly when it was toggled successfully (interval.service) and ngDoCheck
   *
   * @param button the button that is pressed
   */
  buttonToggle(button) {
    console.log(button);
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, { powerState: !button.power, ip: this.device.ip, channel: button.num }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  /**
   * update the shown state of the device/channel to the user
   */
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
