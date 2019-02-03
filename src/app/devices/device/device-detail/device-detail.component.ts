/**
 * Shows the device details
 * toggle able with a button
 * gets the showInfo and device property from its parent => device
 *
 * @author Manuel Dielacher
 */

import { Component, OnInit, Input } from '@angular/core';
import { DeviceComponent } from '../../device/device.component';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {

  @Input() showInfo: DeviceComponent;
  @Input() device: DeviceComponent;

  constructor() { }

  ngOnInit() {
  }

}
