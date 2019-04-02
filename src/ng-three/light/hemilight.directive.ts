import { Directive, Input } from '@angular/core';
import * as THREE from 'three';

@Directive({
  selector: 'ngt-hemispherelight'
})
export class HemisphereLightDirective {
  // element parameters
  @Input() color: string = '#FFFF00';
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  
  public light: THREE.HemisphereLight;

  constructor() {
    this.light = new THREE.HemisphereLight( 0xffffff, 0xffffff, 1.1 );
    this.light.color.setHSL( 0.6, 1, 0.6 );
    this.light.groundColor.setHSL( 0.095, 1, 0.75 );
  }

  ngOnInit() {
    this.setPosition(this.location);
  }

  ngOnChanges(changes) {
    if(changes.position && changes.position.currentValue) {
      this.setPosition(this.location);
    }
  }

  setPosition(location) {
    this.light.position.set(location[0], location[1], location[2]);
  }
}
