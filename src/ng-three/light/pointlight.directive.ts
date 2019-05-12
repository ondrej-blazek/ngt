import { Directive, Input, OnInit, OnChanges, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-point-light'     // tslint:disable-line
})
export class PointLightDirective implements OnInit, OnChanges, AfterContentInit, OnDestroy {
  // element parameters
  @Input() offset: THREE.Vector3;
  @Input() animate: boolean;
  @Input() content: any;

  private parentID: string;
  private subscription: Subscription;
  public light: THREE.PointLight;
  public lightHelper: THREE.PointLightHelper;

  constructor (
    private chronosService: ChronosService
  ) {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.animate = false;
    this.content = null;
    this.parentID = '';

    // Light + helper object
    this.light = new THREE.PointLight();
    this.lightHelper = new THREE.PointLightHelper(this.light, 2);

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'enableLayer' && message.id === this.parentID ) {
          this.light.layers.enable(message.layerNo);
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

  renderID (passDown: string): void {
    this.parentID = passDown;
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
