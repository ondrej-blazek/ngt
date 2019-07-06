import { Directive, ContentChild, ContentChildren, QueryList, OnInit, OnDestroy, AfterContentInit } from '@angular/core';

import { NgtRenderDirective } from '@ngt/core';
import { NgcRenderDirective } from '@ngc/core';
import { NgdRenderDirective } from '@ngd/core';


@Directive({
  selector: 'ngs-chronos'     // tslint:disable-line
})
export class ChronosDirective implements OnInit, OnDestroy, AfterContentInit {
  // child components / directives
  @ContentChild(NgtRenderDirective, {static: true}) threeRenderDirective: NgtRenderDirective;
  @ContentChildren(NgcRenderDirective) canvasDomQuery: QueryList<NgcRenderDirective>;
  @ContentChildren(NgdRenderDirective) htmlDomQuery: QueryList<NgdRenderDirective>;

  private chronosID: string;
  private canvasRenderDirectives: NgcRenderDirective[];
  private domRenderDirectives: NgdRenderDirective[];
  private currentFrame: number;

  constructor () {
    this.chronosID = '';
    this.canvasRenderDirectives = [];
    this.currentFrame = 0;
  }

  ngOnInit () {}

  ngAfterContentInit () {
    // Fetch the dom elements into an array
    this.canvasRenderDirectives = this.canvasDomQuery.toArray();
    this.domRenderDirectives = this.htmlDomQuery.toArray();

    this.propagateID(this.chronosID);
    this.render();
  }

  ngOnDestroy () {
    cancelAnimationFrame(this.currentFrame);
  }

  // ---------------------------------------------------------------------------------

  processID (chronosID: string) {     // Executed BEFORE ngOnInit
    this.chronosID = chronosID;
    this.propagateID_Three (this.chronosID);
  }

  propagateID_Three (chronosID: string) {
    if (this.threeRenderDirective) {
      this.threeRenderDirective.processID(chronosID);
    }
  }

  propagateID (chronosID: string) {
    for (const oneCanvasRender of this.canvasRenderDirectives) {
      oneCanvasRender.processID(chronosID);
    }
    for (const oneCanvasRender of this.domRenderDirectives) {
      oneCanvasRender.processID(chronosID);
    }
  }

  render (): void {
    let animFrame = 0;

    try {
      animFrame = requestAnimationFrame(() => this.render());
    } catch (evt) {
      console.error(evt);
    }

    // This function now executes all rendering needs synchronously across all enclosed directives 3D / 2D
    this.currentFrame = animFrame;
    this.propagateRender ();
  }

  propagateRender (): void {
    if (this.threeRenderDirective) {
      this.threeRenderDirective.render();
    }
    for (const oneCanvasRender of this.canvasRenderDirectives) {
      oneCanvasRender.render();
    }
  }
}
