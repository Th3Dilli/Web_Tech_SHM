import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterByName'
})
export class FilterPipe implements PipeTransform {

  transform(devices: any, term: any): any {
    return devices.filter(device => {
      return device.device_name.toLowerCase().includes(term.toLowerCase());
    })
  }

}
