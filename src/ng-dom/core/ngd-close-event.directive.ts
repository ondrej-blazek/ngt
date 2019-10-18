import { Directive, HostListener } from '@angular/core';
import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: '[ngdCloseEvent]'       // tslint:disable-line
})
export class NgdCloseEventDirective {
  private chronosID: string;

  constructor(
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
  }

  processID (chronosID: string): void {
    this.chronosID = chronosID;
  }

  @HostListener('click')
  onMouseEnter() {
    this.chronosService.domCloseEvent(this.chronosID, 'DOM-LAYER');
  }
}
