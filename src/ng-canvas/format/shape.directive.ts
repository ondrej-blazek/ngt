import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngc-shape'     // tslint:disable-line
})
export class ShapeDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;

  constructor(
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';

    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'mouseMove' && message.id === this.chronosID ) {
          this.mouseMove (message.mouse.x, message.mouse.y);
        }
        if (message.type === 'mouseClick' && message.id === this.chronosID ) {
          this.mouseClick ();
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

  mouseMove (mouseX: number, mouseY: number): void {
    this.content.mouseMove (mouseX, mouseY);
  }
  
  mouseClick (): void {
    this.content.mouseClick ();
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
