import { Directive } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-raycaster'
})
export class RaycasterDirective {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera;      // <<<< Perspective ONLY??  no ortho  - TODO

  private subscription: Subscription;
  private parentID: string;
  private rayCaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;
  private intersected: any;

  constructor(
    private chronosService: ChronosService,
  ) {
    this.parentID = '';
    this.rayCaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseIsActive = false;
    this.intersected = null;

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'mouseMove' && message.id === this.parentID) this.mouse = message.mouse;
        if (message.type === 'mouseActive' && message.id === this.parentID) this.mouseIsActive = message.active;
      }
    );
  }

  setScene (masterScene:THREE.Scene):void {
    this.scene = masterScene;
  }

  setCamera (masterCamera:THREE.PerspectiveCamera):void {
    this.camera = masterCamera;
  }

  renderID(passDown: string): void {
    this.parentID = passDown;
  }

  render(): void {
    if (this.mouseIsActive) {
      this.rayCaster.setFromCamera( this.mouse, this.camera );
      let intersects: Array<any> = this.rayCaster.intersectObjects( this.scene.children );

      try {
        if (intersects.length > 0) {

          // for(let element of intersects) {
          //   if ( element.object.name !== 'ground' && element.object.type === 'Mesh') {
          //     element.object.material.color.set(0xff0000);
          //   }
          // }

					if (intersects[0].object.name !== 'ground' && intersects[0].object.type === 'Mesh' ) {
						if ( this.intersected ) this.intersected.material.color.setHex( this.intersected.currentHex );
            this.intersected = intersects[0].object;

						this.intersected.currentHex = this.intersected.material.color.getHex();
            this.intersected.material.color.setHex( 0xff0000 );
					}

        } else {
          if ( this.intersected ) this.intersected.material.color.setHex( this.intersected.currentHex );
					this.intersected = null;
        }
      } catch (e) {
        // TODO - better handling of failures.
      }
    }
  }
}
