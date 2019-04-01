import { Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { NgtRenderDirective } from '@ngt/core';
import { NgcRenderDirective } from '@ngc/core';


@Directive({
  selector: 'ngs-chronos'     // tslint:disable-line
})
export class ChronosDirective implements AfterContentInit {
  // child components / directives
  @ContentChildren(NgtRenderDirective) threeDomQuery: QueryList<NgtRenderDirective>;
  @ContentChildren(NgcRenderDirective) canvasDomQuery: QueryList<NgcRenderDirective>;

  private parentID: string;
  private threeDirectives: NgtRenderDirective[] = [];
  private canvasDirectives: NgcRenderDirective[] = [];

  constructor() {
    this.parentID = '';
  }
  // ngOnInit() { }

  ngAfterContentInit() {
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

  propagateID(passDown: string) {
    for (const oneThree of this.threeDirectives) {
      oneThree.renderID(passDown);
    }
    for (const oneCanvas of this.canvasDirectives) {
      oneCanvas.renderID(passDown);
    }
  }

  propagateRender() {
    for (const oneThree of this.threeDirectives) {
      oneThree.render();
    }
    for (const oneCanvas of this.canvasDirectives) {
      oneCanvas.render();
    }
  }

  render() {
    // This function now executes all rendering needs synchronously across all enclosed directives
    this.propagateRender ();

    try {
      requestAnimationFrame(() => this.render());
    } catch (evt) {
      console.error(evt);
    }
  }
}
