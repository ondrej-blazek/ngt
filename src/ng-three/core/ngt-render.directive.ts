import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective {
  // element parameters
  @Input() id: string;

  constructor() { }

  render(): void {
    console.log ('ngt-render - called', this.id);
  }
}
