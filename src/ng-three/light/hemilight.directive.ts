import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-hemisphere-light'     // tslint:disable-line
})
export class HemisphereLightDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() offset: THREE.Vector3;
  @Input() animate: boolean;
  @Input() content: any;

  private chronosID: string;
  private subscription: Subscription;
  public light: THREE.HemisphereLight;
  public lightHelper: THREE.HemisphereLightHelper;

  constructor (
    private chronosService: ChronosService
  ) {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.animate = false;
    this.content = null;
    this.chronosID = '';

    // Light + helper object
    this.light = new THREE.HemisphereLight();
    this.lightHelper = new THREE.HemisphereLightHelper( this.light, 20 );

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'enableLayer' && message.id === this.chronosID ) {
          this.light.layers.enable(message.layerNo);
        }
        if (message.type === 'toggleLayer' && message.id === this.chronosID ) {
          this.light.layers.toggle(message.layerNo);
        }
        if (message.type === 'disableLayer' && message.id === this.chronosID ) {
          this.light.layers.disable(message.layerNo);
        }
      }
    );
  }

  ngOnChanges (changes) {
    if (changes.offset && changes.offset.currentValue) {
      this.content.setOffset (this.light, changes.offset.currentValue);
    }
    if (changes.animate && changes.animate.currentValue) {
      this.animate = changes.animate.currentValue;
    }
  }

  ngOnInit () {
    this.light = this.content.setLight(this.light);
    this.lightHelper.update();
  }

  ngAfterContentInit (): void {}
  ngOnDestroy (): void {
    this.lightHelper.dispose();
  }

  processID (passDown: string): void {
    this.chronosID = passDown;
  }

  render (): void {
    if (this.content && this.animate) {
      this.light = this.content.render(this.light);
    }
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/lights/HemisphereLight
//   https://threejs.org/docs/#api/en/helpers/HemisphereLightHelper
