import { Directive, ContentChild, AfterContentInit } from '@angular/core';
import { GroundDirective, DomeDirective } from '@ngt/environment/';

@Directive({
  selector: 'ngt-environment'
})
export class EnvironmentDirective implements AfterContentInit {
  @ContentChild(GroundDirective) groundDirective: any;      // Ground or some kind zero plane
  @ContentChild(DomeDirective) domeDirective: any;          // Dome color/gradient + fog density

  private scene: THREE.Scene;
  private parentID: string;

  get plane() {
    let returnValue:any = null;
    if (this.groundDirective) returnValue =  this.groundDirective.plane;
    return returnValue;
  }

  get dome() {
    let returnValue:any = null;
    if (this.domeDirective) returnValue =  this.domeDirective.dome;
    return returnValue;
  }

  constructor() {
    this.parentID = '';
  }

  ngAfterContentInit () {
    if (this.plane) {
      this.scene.add(this.plane);
    }
    if (this.dome) {
      this.scene.add(this.dome);
    }
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }
}
