import { Directive, Input, OnInit, OnDestroy, OnChanges, AfterContentInit, ElementRef, QueryList, ContentChildren } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { NgdCloseEventDirective } from './ngd-close-event.directive';

@Directive({
  selector: 'ngd-render'       // tslint:disable-line
})
export class NgdRenderDirective implements OnInit, OnDestroy, OnChanges, AfterContentInit {
  @Input() link: string;
  @Input() interact: boolean;

  @ContentChildren(NgdCloseEventDirective) closeEventQuery: QueryList<NgdCloseEventDirective>;

  private chronosID: string;
  private subscription: Subscription;
  private clickedFlag: boolean;
  private closeEventArray: NgdCloseEventDirective[] = [];

  private valueLeft: number;
  private valueTop: number;

  constructor(
    private el: ElementRef,
    private chronosService: ChronosService
  ) {
    this.link = '';
    this.interact = false;

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

            if (this.interact) {
              this.chronosService.domLayerAddition ('DOM-LAYER');
            }
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

          if (this.interact) {
            this.chronosService.domLayerRemoval ('DOM-LAYER');
          }
        }
      }
    );
  }

  ngOnChanges (changes) {}
  ngOnInit () {
    this.updateElementVisibility ('none');
    this.updateElementPosition (0, 0);
  }
  ngAfterContentInit () {
    this.closeEventArray = this.closeEventQuery.toArray();
  }
  ngOnDestroy () {}

  // ---------------------------------------------------------------------------------

  processID (chronosID: string): void {
    this.chronosID = chronosID;
    this.propagateID (this.chronosID);
  }

  propagateID (chronosID: string): void {
    for (const oneDirective of this.closeEventArray) {
      oneDirective.processID(chronosID);
    }
  }

  updateElementPosition (top: number, left: number): void {
    this.el.nativeElement.style.top = top + 'px';
    this.el.nativeElement.style.left = left + 'px';
  }
  updateElementVisibility (display: string): void {
    this.el.nativeElement.style.display = display;
  }
}
