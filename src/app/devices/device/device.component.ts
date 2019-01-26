import { Component, OnInit, Input } from '@angular/core';
import { DevicesComponent } from '../devices.component';

@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})
export class DeviceComponent implements OnInit {

  @Input() device: DevicesComponent;
  isOn: Boolean;
  showInfo: Boolean;

  constructor() { }

  ngOnInit() {
  }
  buttonToggle() {
    this.isOn = !this.isOn;
    console.log(this.isOn);
  }
  infoToggle() {
    this.showInfo = !this.showInfo;
  }
}
