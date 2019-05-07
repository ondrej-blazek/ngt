import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';

// TODO - user intercations
// TODO - integration with shared services (projector)

@Directive({
  selector: 'ngc-shape'     // tslint:disable-line
})
export class ShapeDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  constructor() { }

  ngOnInit () {}
  ngAfterViewInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {
    this.content = null;
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
