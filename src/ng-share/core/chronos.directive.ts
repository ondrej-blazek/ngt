import { Directive, ContentChild } from '@angular/core';
// import { RenderDirective } from './render.directive';
// import { ConnectedDirective } from '@app/canvas/connected/connected.directive';


@Directive({
  selector: 'ngs-chronos'
})
export class ChronosDirective {
  // child components / directives
  // @ContentChild(RenderDirective) RenderDirective: RenderDirective;
  // @ContentChild(ConnectedDirective) ConnectedDirective: ConnectedDirective;

  // get threescene() {
  //   return this.RenderDirective;
  // }
  // get overlay() {
  //   return this.ConnectedDirective;
  // }

  constructor() { }
  ngAfterContentInit() {
    this.render();
  }

  render() {
    // This function now executes all rendering needs synchronously across all enclosed directives

    // if (this.threescene) this.threescene.render();
    // if (this.overlay) this.overlay.render();

    try {
      requestAnimationFrame(() => this.render());
    } catch (evt) {
      console.error (evt);
    }
  }
}



/*

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