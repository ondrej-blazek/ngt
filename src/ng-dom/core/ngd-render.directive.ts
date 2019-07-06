import { Directive, OnInit, OnDestroy, OnChanges, AfterContentInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngd-render'
})
export class NgdRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {

  private chronosID: string;
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService
  ) {
    this.chronosID = '';

    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID ) {
          // this.updateCanvasSize (message.width, message.height);
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string): void {
    this.chronosID = chronosID;
  }

}
