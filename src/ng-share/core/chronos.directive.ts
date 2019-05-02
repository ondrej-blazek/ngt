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

  private parentID: string;
  private threeDirectives: NgtRenderDirective[] = [];
  private canvasDirectives: NgcRenderDirective[] = [];
  private currentFrame: number;

  constructor () {
    this.parentID = '';
  }

  ngOnInit () {
    // console.log ('ChronosDirective - ngOnInit');
  }

  ngOnDestroy () {
    cancelAnimationFrame(this.currentFrame);
  }

  ngAfterContentInit () {
    // Fetch the dom elements into an array
    this.threeDirectives = this.threeDomQuery.toArray();
    this.canvasDirectives = this.canvasDomQuery.toArray();

    this.propagateID(this.parentID);
    this.propagateRender();
    this.render();
  }

  idUpdate (passDown: string) {
    this.parentID = passDown;
  }

  propagateID (passDown: string) {
    for (const oneThree of this.threeDirectives) {
      oneThree.renderID(passDown);
    }
    for (const oneCanvas of this.canvasDirectives) {
      oneCanvas.renderID(passDown);
    }
  }

  propagateRender (): void {
    for (const oneThree of this.threeDirectives) {
      oneThree.render();
    }
    for (const oneCanvas of this.canvasDirectives) {
      oneCanvas.render();
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
}
