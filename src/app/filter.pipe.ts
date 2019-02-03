import { Pipe, PipeTransform } from '@angular/core';

/**
 * Comment for module 'filer.pipe.ts'.
 * Comment for method 'FilterPipe()'
 * Filters data with a specific filter term. In our case a devices object gets filter by device.name (room_name)
 * and returns all devices located in the room.
 * @author Markus Macher
 */

 // name for template binding -> (obj: any | filterByName: "room_name")
@Pipe({
  name: 'filterByName'
})

export class FilterPipe implements PipeTransform {

  transform(devices: any, term: any): any {
    return devices.filter(device => {
      return device.name.toLowerCase().includes(term.toLowerCase());
    });
  }

}
