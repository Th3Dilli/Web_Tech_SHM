/**
 * directive for the device component to load dynamicaly different child compenents on it
 * so you can load the SONOFF_4CH or SONOFF_BASIC component dynamicaly depending on the module_type
 * property of the devive
 *
 * the appType selctor specifies where the component shoudl be inserted
 * <ng-template [appType]></ng-template>
 *
 * @author Manuel Dielacher
 */

import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appType]'
})
export class TypeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
