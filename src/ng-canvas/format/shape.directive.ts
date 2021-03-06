import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';
import { LayersService } from '@ngc/service';

@Directive({
  selector: 'ngc-shape'     // tslint:disable-line
})
export class ShapeDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;
  @Input() id: string;
  @Input() interact: boolean;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;
  private screenWidth: number;
  private screenHeight: number;

  constructor(
    private chronosService: ChronosService,
    private layers: LayersService
  ) {
    this.id = '';
    this.interact = false;

    this.chronosID = '';
    this.renderID = '';
    this.screenWidth = 0;
    this.screenHeight = 0;

    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'elementSize' && message.id === this.chronosID ) {
          this.updateCanvasSize (message.width, message.height);
        }
        if (message.type === 'mouseMove' && message.id === this.chronosID ) {
          this.mouseMove (message.mouse.x, message.mouse.y);
        }
        if (message.type === 'mouseActive' && message.id === this.chronosID ) {
          this.mouseActive (message.active);
        }
        if (message.type === 'mouseDown' && message.id === this.chronosID ) {
          this.mouseDown (message.down);
        }
      }
    );
  }

  ngOnInit () {
    // console.log ('uuid + id', this.content.getUUID(), this.id);
  }
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
    if (this.interact && this.content) {
      const mouseX_px = Math.round(((mouseX + 1) / 2) * this.screenWidth);
      const mouseY_px = Math.round(((mouseY - 1) / 2) * this.screenHeight * (-1));
      this.content.mouseMove (mouseX_px, mouseY_px);
    }
  }

  mouseActive (mouseState: boolean) {
    if (this.interact && this.content) {
      this.content.mouseActive (mouseState);
    }
  }

  mouseDown (mouseState: boolean) {
    if (this.interact && this.content) {
      this.content.mouseDown (mouseState);
    }
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
    this.layers.addToLayers(this.renderID, this.id, this.content.getUUID());
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
