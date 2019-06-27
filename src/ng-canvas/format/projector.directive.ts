import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;
  private activeFlag: boolean;
  private clickedFlag: boolean;

  constructor(
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.activeFlag = false;
    this.clickedFlag = false;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setActiveObject' && message.id === this.chronosID && this.content) {
          this.activeFlag = false;
          this.content.activeFlag = true;
        }
        if (message.type === 'activeProjection' && message.id === this.chronosID && this.content) {
          if (this.activeFlag) {
            this.content.activeObject = message.coordinates;
          }
        }
        if (message.type === 'clearActiveObject' && message.id === this.chronosID && this.content) {
          this.activeFlag = false;
          this.content.activeFlag = false;
          this.content.activeObject = null;
        }

        if (message.type === 'setClickedObject' && message.id === this.chronosID && this.content) {
          this.clickedFlag = true;
          this.content.clickedFlag = true;
        }
        if (message.type === 'clickedProjection' && message.id === this.chronosID && this.content) {
          if (this.clickedFlag) {
            this.content.clickedObject = message.coordinates;
          }
        }
        if (message.type === 'clearClickedObject' && message.id === this.chronosID && this.content) {
          this.clickedFlag = false;
          this.content.clickedFlag = false;
          this.content.clickedObject = null;
        }
      }
    );
  }

  ngOnInit () {}
  ngAfterViewInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {
    this.content = null;
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
