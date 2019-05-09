import { Directive, Input, OnInit, AfterViewInit, AfterContentInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'ngc-shape'     // tslint:disable-line
})
export class ShapeDirective implements OnInit, AfterViewInit, AfterContentInit, OnDestroy {
  @Input() content: any;

  private parentID: string;

  constructor() {
    this.parentID = '';
  }

  ngOnInit () {}
  ngAfterViewInit () {}
  ngAfterContentInit () {}
  ngOnDestroy () {
    this.content = null;
  }

  renderID (passDown: string): void {
    this.parentID = passDown;
  }

  render (canvasRef, canvasContext): void {
    this.content.render(canvasRef, canvasContext);
  }
}
