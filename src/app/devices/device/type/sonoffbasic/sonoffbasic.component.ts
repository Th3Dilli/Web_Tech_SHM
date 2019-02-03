/**
 * This holds all the relevant information for a specific device => SONOFF_BASIC == SONOFF_TOUCH
 * it has 4 channels so all those need to bee access able with a button and the button needs
 * to show the current state of that channel
 *
 * @author Manuel Dielacher, Philipp Freislich
 */

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

  /**
   * Check if the button state needs to be updated
   */
  ngDoCheck() {
    if (this.device.stat !== undefined && this.isOn !== this.device.stat.POWER1) {
      this.checkState();
    }
  }

  /**
   * do a http patch request to update the device through the server
   * the button state will update automaticaly when it was toggled successfully (interval.service) and ngDoCheck
   *
   * @param button the button that is pressend
   */
  buttonToggle() {
    const url = 'http://localhost:3000/device/toggle';
    this.http.patch<any>(url, { powerState: !this.isOn, ip: this.device.ip, channel: 1 }).subscribe(response => {
      console.log(response);
    }, error => {
      console.log(error);
    });
  }

  /**
   * update the button state with the data in the device.state property
   */
  checkState() {
    this.isOn = this.device.stat.POWER1;
    this.buttonText = (this.isOn) ? 'ON' : 'OFF';
  }
}
