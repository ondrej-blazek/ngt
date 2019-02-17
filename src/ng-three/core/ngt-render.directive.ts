import { Directive, Input } from '@angular/core';

@Directive({
  selector: 'ngt-render'     // tslint:disable-line
})
export class NgtRenderDirective {
  // element parameters
  @Input() id: string;

  private parentID: string = "";

  constructor() { }

  renderID(passDown: string): void {
    this.parentID = passDown;
    // console.log('ngt-render', this.parentID, this.id);
  }

  render(): void {
    // console.log ('ngt-render - called', this.id);
  }
}
