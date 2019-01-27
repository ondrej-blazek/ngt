import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ngc-render'     // tslint:disable-line
})
export class NgcRenderDirective {
  // element parameters
  @Input() id: string;

  constructor() { }

  render(): void {
    console.log ('ngc-render - called', this.id);
  }
}
