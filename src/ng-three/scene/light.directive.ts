import { OnInit, Directive, ContentChildren, QueryList, AfterContentInit, Input, OnChanges } from '@angular/core';
import { PointLightDirective, HemisphereLightDirective } from '@ngt/light';

@Directive({
  selector: 'ngt-light'     // tslint:disable-line
})
export class LightDirective implements OnChanges, OnInit, AfterContentInit {
  // element parameters
  @Input() helpers: boolean;

  // child components / directives
  @ContentChildren(PointLightDirective) pointLightDomQuery: QueryList<PointLightDirective>;
  @ContentChildren(HemisphereLightDirective) hemiLightDomQuery: QueryList<HemisphereLightDirective>;

  private scene: THREE.Scene;
  private chronosID: string;

  private pointLightDirectives: PointLightDirective[];
  private hemiLightDirectives: HemisphereLightDirective[];

  constructor () {
    this.helpers = false;
    this.chronosID = '';
    this.pointLightDirectives = [];
    this.hemiLightDirectives = [];
  }

  ngOnChanges (changes) {
    if (changes.helpers) {
      this.helpers = changes.helpers.currentValue;
    }
  }

  ngOnInit () {}

  ngAfterContentInit () {
    // Collect handlers into Array
    this.pointLightDirectives = this.pointLightDomQuery.toArray();
    this.hemiLightDirectives = this.hemiLightDomQuery.toArray();

    // Add lights and their helper objects into the scene
    for (const oneDirective of this.pointLightDirectives) {
      this.scene.add(oneDirective.light);
      if (this.helpers === true) {
        this.scene.add(oneDirective.lightHelper);
      }
    }
    for (const oneDirective of this.hemiLightDirectives) {
      this.scene.add(oneDirective.light);
      if (this.helpers === true) {
        this.scene.add(oneDirective.lightHelper);
      }
    }
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  processID (passDown: string): void {
    this.chronosID = passDown;
    this.propagateID (passDown);
  }

  propagateID (passDown: string): void {
    for (const oneDirective of this.pointLightDirectives) {
      oneDirective.processID(passDown);
    }
    for (const oneDirective of this.hemiLightDirectives) {
      oneDirective.processID(passDown);
    }
  }

  propagateRender (): void {
    for (const oneDirective of this.pointLightDirectives) {
      oneDirective.render();
    }
    for (const oneDirective of this.hemiLightDirectives) {
      oneDirective.render();
    }
  }

  render (): void {
    this.propagateRender();
  }
}
