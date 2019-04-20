import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'ngt';
  constructor() {}
}



/*
TODO - Structure and order
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
