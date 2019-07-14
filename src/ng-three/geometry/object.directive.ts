import { Directive, Input, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-object'     // tslint:disable-line
})
export class ObjectDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  @Input() offset: THREE.Vector3;
  @Input() rotation: THREE.Euler;
  @Input() scale: THREE.Vector3;
  @Input() animate: boolean;
  @Input() interact: boolean;
  @Input() name: string;
  @Input() content: any;

  private subscription: Subscription;
  private enabled: boolean;
  public object: THREE.Mesh;

  constructor (
    private chronosService: ChronosService
  ) {
    this.offset = new THREE.Vector3(0, 0, 0);
    this.rotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.scale = new THREE.Vector3(1, 1, 1);
    this.animate = true;
    this.interact = false;
    this.enabled = true;
    this.name = '';

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'setActiveObject') {
          this.userSetActiveObject(message.activeID);
        }
        if (message.type === 'clearActiveObject') {
          this.userClearActiveObject (message.activeID);
        }
        if (message.type === 'setClickedObject') {
          this.userSetClickedObject (message.clickedID);
        }
        if (message.type === 'clearClickedObject') {
          this.userClearClickedObject (message.clickedID);
        }
        if (message.type === 'activeOverlay') {
          this.enableControls (message.active);
        }
      }
    );
  }

  ngOnChanges (changes) {
    if (changes.offset && changes.offset.currentValue) {
      this.offset = changes.offset.currentValue;
      this.content.setPosition (changes.offset.currentValue);
    }
    if (changes.rotation && changes.rotation.currentValue) {
      this.rotation = changes.rotation.currentValue;
      this.content.setRotation (changes.rotation.currentValue);
    }
    if (changes.scale && changes.scale.currentValue) {
      this.scale = changes.scale.currentValue;
      this.content.setScale (changes.scale.currentValue);
    }
    if (changes.animate && changes.animate.currentValue) {
      this.animate = changes.animate.currentValue;
    }
    if (changes.interact && changes.interact.currentValue) {
      this.interact = changes.interact.currentValue;
    }
  }

  ngOnInit (): void {
    this.object = this.content.object;
    if (this.interact) {
      this.chronosService.addToInteraction(this.object.uuid);
    }
    if (this.name) {
      this.object.name = this.name;
    }
  }

  ngAfterContentInit (): void {}
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  render (): void {
    if (this.content && this.animate) {
      this.content.render();
    }
  }

  // User interaction
  userSetActiveObject (id: string): void {
    if (this.object.uuid === id && this.interact && this.enabled) {
      this.content.userSetActiveObject();
    }
  }

  userClearActiveObject (id: string): void {
    if (this.object.uuid === id && this.interact) {
      this.content.userClearActiveObject();
    }
  }

  userSetClickedObject (id: string): void {
    if (this.object.uuid === id && this.interact && this.enabled) {
      this.content.userSetClickedObject();
    }
  }

  userClearClickedObject (id: string): void {
    if (this.object.uuid === id && this.interact) {
      this.content.userClearClickedObject();
    }
  }

  enableControls (active: boolean): void {
    this.enabled = !active;
  }
}
