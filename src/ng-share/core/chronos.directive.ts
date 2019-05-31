import { Directive, ContentChildren, QueryList, OnInit, OnDestroy, AfterContentInit } from '@angular/core';

import { NgtRenderDirective } from '@ngt/core';
import { NgcRenderDirective } from '@ngc/core';


@Directive({
  selector: 'ngs-chronos'     // tslint:disable-line
})
export class ChronosDirective implements OnInit, OnDestroy, AfterContentInit {
  // child components / directives
  @ContentChildren(NgtRenderDirective) threeDomQuery: QueryList<NgtRenderDirective>;
  @ContentChildren(NgcRenderDirective) canvasDomQuery: QueryList<NgcRenderDirective>;

  private chronosID: string;
  private threeRenderDirectives: NgtRenderDirective[];
  private canvasRenderDirectives: NgcRenderDirective[];
  private currentFrame: number;

  constructor () {
    this.chronosID = '';
    this.threeRenderDirectives = [];
    this.canvasRenderDirectives = [];
    this.currentFrame = 0;
  }

  ngOnInit () {}

  ngAfterContentInit () {
    // Fetch the dom elements into an array
    this.threeRenderDirectives = this.threeDomQuery.toArray();
    this.canvasRenderDirectives = this.canvasDomQuery.toArray();

    this.propagateID(this.chronosID);
    this.propagateRender();
    this.render();
  }

  ngOnDestroy () {
    cancelAnimationFrame(this.currentFrame);
  }

  // ---------------------------------------------------------------------------------

  idUpdate (passDown: string) {
    this.chronosID = passDown;
    // this.propagateID(this.chronosID);
  }

  propagateID (passDown: string) {
    for (const oneThreeRender of this.threeRenderDirectives) {
      oneThreeRender.processID(passDown);
    }
    for (const oneCanvasRender of this.canvasRenderDirectives) {
      oneCanvasRender.processID(passDown);
    }
  }

  render (): void {
    let animFrame = 0;

    try {
      animFrame = requestAnimationFrame(() => this.render());
    } catch (evt) {
      console.error(evt);
    }

    // This function now executes all rendering needs synchronously across all enclosed directives
    this.currentFrame = animFrame;
    this.propagateRender ();
  }

  propagateRender (): void {
    for (const oneThreeRender of this.threeRenderDirectives) {
      oneThreeRender.render();
    }
    for (const oneCanvasRender of this.canvasRenderDirectives) {
      oneCanvasRender.render();
    }
  }
}
