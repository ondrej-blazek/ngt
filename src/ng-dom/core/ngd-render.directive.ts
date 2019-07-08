import { Directive, Input, OnInit, OnDestroy, OnChanges, AfterContentInit, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngd-render'
})
export class NgdRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  @Input() link: string;

  private chronosID: string;
  private subscription: Subscription;
  private clickedFlag: boolean;

  private valueLeft: number;
  private valueTop: number;

  constructor(
    private el: ElementRef,
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.clickedFlag = false;

    this.valueLeft = 0;
    this.valueTop = 0;

    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setClickedObject' && message.id === this.chronosID) {
          if (this.link === message.name) {
            this.clickedFlag = true;
            this.updateElementVisibility ('block');
          }
        }
        if (message.type === 'clickedProjection' && message.id === this.chronosID) {
          if (this.clickedFlag) {
            this.valueTop = message.coordinates.y;
            this.valueLeft = message.coordinates.x;
            this.updateElementPosition (this.valueTop, this.valueLeft);
          }
        }
        if (message.type === 'clearClickedObject' && message.id === this.chronosID) {
          this.clickedFlag = false;
          this.updateElementVisibility ('none');
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {
    this.updateElementVisibility ('none');
    this.updateElementPosition (0, 0);
  }
  ngAfterContentInit () {}
  ngOnDestroy () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string): void {
    this.chronosID = chronosID;
  }

  updateElementPosition (top: number, left: number): void {
    this.el.nativeElement.style.top = top + 'px';
    this.el.nativeElement.style.left = left + 'px';
  }
  updateElementVisibility (display: string): void {
    this.el.nativeElement.style.display = display;
  }
}
