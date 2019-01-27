import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appType]'
})
export class TypeDirective {

  constructor(public viewContainerRef: ViewContainerRef) { }

}
