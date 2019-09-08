import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-light-point'     // tslint:disable-line
})
export class PointLightDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() offset: THREE.Vector3;
  @Input() animate: boolean;
  @Input() content: any;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;
  public light: THREE.PointLight;
  public lightHelper: THREE.PointLightHelper;

  constructor (
    private chronosService: ChronosService
  ) {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.animate = false;
    this.content = null;
    this.chronosID = '';
    this.renderID = '';

    // Light + helper object
    this.light = new THREE.PointLight();
    this.lightHelper = new THREE.PointLightHelper(this.light, 2);

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

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (): void {
    if (this.content && this.animate) {
      this.light = this.content.render(this.light);
    }
  }
}

// More reading:
//   https://threejs.org/docs/#api/en/lights/PointLight
//   https://threejs.org/docs/#api/en/helpers/PointLightHelper
