import { Component, OnInit, Input } from '@angular/core';
import { DeviceService } from '../services/device.service';
import { ActivatedRoute } from '@angular/router';
import { Device } from '../services/device';

@Component({
  selector: 'app-device-detail',
  templateUrl: './device-detail.component.html',
  styleUrls: ['./device-detail.component.css']
})
export class DeviceDetailComponent implements OnInit {
 
   device: Device;

  constructor(private device_service: DeviceService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.getDevice();
  }

  getDevice(): void {
    let id = +this.route.snapshot.paramMap.get('id'); //+ cast to number
    console.log(id)
    this.device_service.getDeviceById(id)
    .subscribe(res => {
      console.log(res)
      this.device = res[0];
      console.log(this.device)
    }, err => {
    

    });

  }


}




