import { Directive, ContentChildren, QueryList, AfterContentInit } from '@angular/core';

import { NgtRenderDirective } from '@ngt/core';
import { NgcRenderDirective } from '@ngc/core';


@Directive({
  selector: 'ngs-chronos'     // tslint:disable-line
})
export class ChronosDirective implements AfterContentInit {
  // child components / directives
  @ContentChildren(NgtRenderDirective) threeDOMquery: QueryList<NgtRenderDirective>;
  @ContentChildren(NgcRenderDirective) canvasDOMquery: QueryList<NgcRenderDirective>;

  private threeDirectives: NgtRenderDirective[] = [];
  private canvasDirectives: NgcRenderDirective[] = [];


  constructor() { }

  ngAfterContentInit() {
    this.threeDirectives = this.threeDOMquery.toArray();
    this.canvasDirectives = this.canvasDOMquery.toArray();

    this.propagateRender ();
    this.render();
  }

  propagateRender () {
    for (const oneThree of this.threeDirectives) {
      oneThree.render();
    }
    for (const oneCanvas of this.canvasDirectives) {
      oneCanvas.render();
    }
  }

  render() {
    // This function now executes all rendering needs synchronously across all enclosed directives
    // this.propagateRender ();

    try {
      requestAnimationFrame(() => this.render());
    } catch (evt) {
      console.error (evt);
    }
  }
}



/*
Order of elements within chronos matter!!!

<ngs-chronos>
  <!-- 3D scene(s) -->
  <ngt-render>
    <ngt-orbit></ngt-orbit>
    <ngt-scene>
      <ngt-camera/>
      <ngt-pointlight/>
      <ngt-hemispherelight/>
      <ngt-environment>
        <ngt-ground/>
        <ngt-dome/>
      </ngt-environment>
      <ngt-geometry/>
    </ngt-scene>
  </ngt-render>

  <!-- 2D canvas overlay(s) -->
  <ngc-render id="baseUI">
    <ngc-content></ngc-content>
    <ngc-content></ngc-content>
  </ngc-render>
  <ngc-render id="popups">
    <ngc-content></ngc-content>
  </ngc-render>
</ngs-chronos>

*/
