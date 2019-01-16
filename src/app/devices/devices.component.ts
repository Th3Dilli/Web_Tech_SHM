import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {

  typesOfdevices: string[] = ['Device 1', 'Device 2', 'Device 3', 'Device 4', 'Device 5'];

  constructor() { }

  ngOnInit() {
  }

}
