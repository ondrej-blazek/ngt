import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-projector'     // tslint:disable-line
})
export class ProjectorDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;
  @Input() link: string;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;
  private activeFlag: boolean;
  private clickedFlag: boolean;
  private screenWidth: number;
  private screenHeight: number;

  constructor(
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.screenWidth = 0;
    this.screenHeight = 0;
    this.activeFlag = false;
    this.clickedFlag = false;
    this.link = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID && this.content) {
          this.updateCanvasSize (message.width, message.height);
        }
        if (message.type === 'mouseMove' && message.id === this.chronosID && this.content) {
          this.mouseMove (message.mouse.x, message.mouse.y);
        }
        if (message.type === 'mouseActive' && message.id === this.chronosID && this.content) {
          this.mouseActive (message.active);
        }
        if (message.type === 'mouseDown' && message.id === this.chronosID && this.content) {
          this.mouseDown (message.down);
        }
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
          if (this.link === message.name) {
            this.clickedFlag = true;
            this.content.clickedFlag = true;
          }
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

  updateCanvasSize (width: number, height: number): void {
    this.screenWidth = width;
    this.screenHeight = height;
  }

  mouseMove (mouseX: number, mouseY: number): void {
    const mouseX_px = Math.round(((mouseX + 1) / 2) * this.screenWidth);
    const mouseY_px = Math.round(((mouseY - 1) / 2) * this.screenHeight * (-1));
    this.content.mouseMove (mouseX_px, mouseY_px);
  }

  mouseActive (mouseState: boolean) {
    this.content.mouseActive (mouseState);
  }

  mouseDown (mouseState: boolean) {
    this.content.mouseDown (mouseState);
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
