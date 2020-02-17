/**
 * Holds one device and all its information
 * it dynamically check what child component to load SONOFF_4CH  || SONOFF_BASIC for example
 *
 * @author Manuel Dielacher, Markus Macher
 */

import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver, EventEmitter, Output } from '@angular/core';
import { Device } from '../../services/device';
import { TypeDirective } from './type.directive';
import { SonoffbasicComponent } from './type/sonoffbasic/sonoffbasic.component';
import { Sonoff4chComponent } from './type/sonoff4ch/sonoff4ch.component';


@Component({
  selector: 'app-device',
  templateUrl: './device.component.html',
  styleUrls: ['./device.component.css']
})

export class DeviceComponent implements OnInit {
  @Input() device: Device;
  @Output() getId = new EventEmitter<Device>();
  @Output() getDevice = new EventEmitter<Device>();

  showInfo: Boolean;
  buttonText: String = 'OFF';
  component: any;

  @ViewChild(TypeDirective, { static: true }) appType: TypeDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }

  deleteDevice(device) {
    this.getId.emit(device);
  }

  editDevice(device) {
    this.getDevice.emit(device);
  }

  infoToggle() {
    this.showInfo = !this.showInfo;
  }

  /**
   * Check what type of child component to load
   * and passes the device property over
   */
  loadComponent() {
    switch (this.device.module_type) {
      case 'SONOFF_4CH':
        {
          this.component = Sonoff4chComponent;
          break;
        }
      case 'SONOFF_BASIC':
        {
          this.component = SonoffbasicComponent;
          break;
        }
      case 'SONOFF_TOUCH':
        {
          this.component = SonoffbasicComponent;
          break;
        }
      default:
        {
          this.component = SonoffbasicComponent;
        }
    }

    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(this.component);

    const viewContainerRef = this.appType.viewContainerRef;
    viewContainerRef.clear();

    const componentRef = viewContainerRef.createComponent(componentFactory);
    (<Sonoff4chComponent>componentRef.instance).device = this.device;
  }
}
