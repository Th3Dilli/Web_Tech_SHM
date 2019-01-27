import { Component, OnInit, Input, ViewChild, ComponentFactoryResolver } from '@angular/core';
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
  showInfo: Boolean;
  buttonText: String = 'OFF';
  component: any;

  @ViewChild(TypeDirective) appType: TypeDirective;

  constructor(private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit() {
    this.loadComponent();
  }


  infoToggle() {
    this.showInfo = !this.showInfo;
  }

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
