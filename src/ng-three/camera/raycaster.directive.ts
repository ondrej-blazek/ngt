import { Directive, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import * as THREE from 'three';

import { ChronosService } from '@ngs/core/chronos.service';

// TODO - Look into all 'any' objects and definitions to see if they can be made more specific.
// TODO - Objects also have the ability to react to raycaster - investigate some more.
// TODO - detect front and back

@Directive({
  selector: 'ngt-raycaster'     // tslint:disable-line
})
export class RaycasterDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {

  private scene: THREE.Scene;
  private camera: THREE.PerspectiveCamera | THREE.OrthographicCamera;

  private subscription: Subscription;
  private chronosID: string;
  private renderID: string;

  private rayCaster: THREE.Raycaster;
  private mouse: THREE.Vector2;
  private mouseIsActive: boolean;

  private currentObject: any;
  private currentObjectID: string;
  private previousObject: any;
  private previousObjectID: string;

  private interactionArray: Array<string>;
  private intersects: Array<any>;

  constructor (
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.rayCaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.mouseIsActive = false;

    this.currentObject = null;
    this.currentObjectID = '';
    this.previousObject = null;
    this.previousObjectID = '';

    this.interactionArray = [];
    this.intersects = [];

    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'mouseMove' && message.id === this.chronosID) {
          this.mouse = message.mouse;
        }
        if (message.type === 'mouseActive' && message.id === this.chronosID) {
          this.mouseIsActive = message.active;
        }
        if (message.type === 'mouseClick' && message.id === this.chronosID) {
          this.interactionArray = this.chronosService.getInteraction ();
          this.rayClick ();
        }
        if ((message.type === 'enableLayer' || message.type === 'disableLayer' || message.type === 'toggleLayer') && message.id === this.chronosID) {       // tslint:disable-line
          this.interactionArray = this.chronosService.getInteraction ();
        }
      }
    );
  }

  ngOnChanges (changes): void {}
  ngOnInit (): void {}
  ngAfterContentInit (): void {
    this.interactionArray = this.chronosService.getInteraction ();
  }
  ngOnDestroy (): void {
    this.subscription.unsubscribe();
  }

  setScene (masterScene: THREE.Scene): void {
    this.scene = masterScene;
  }

  setCamera (masterCamera: THREE.PerspectiveCamera | THREE.OrthographicCamera): void {
    this.camera = masterCamera;
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }

  render (): void {
    if (this.mouseIsActive) {
      const interaction = this.rayFilter ();
      this.rayThrough (interaction);
    }
  }

  // Ray through / mouse over
  setActiveObject (oneObject: any): void {
    this.chronosService.setActiveObject (this.chronosID, oneObject);
  }

  clearActiveObject (oneObject: any): void {
    this.chronosService.clearActiveObject (this.chronosID, oneObject);

    this.previousObject = null;
    this.previousObjectID = '';
  }

  rayThrough (interaction: any): void {
    // Continuous (every frame) check
    if (interaction === null) {
      this.currentObject = null;
      this.currentObjectID = '';
    } else {
      this.previousObject = this.currentObject;
      this.previousObjectID = this.currentObjectID;
      this.currentObject = interaction;
      this.currentObjectID = interaction.uuid;
    }

    // One time event reactions
    if (this.currentObjectID !== '' && this.previousObjectID !== this.currentObjectID) {
      if (this.previousObjectID !== '') {
        this.clearActiveObject (this.previousObject);
        this.setActiveObject (this.currentObject);
      } else {
        this.setActiveObject (this.currentObject);
      }
    } else {
      if (this.previousObjectID !== '' && this.previousObjectID !== this.currentObjectID) {
        this.clearActiveObject (this.previousObject);
      }
    }
  }

  // Ray through / mouse click
  rayClick (): void {
    const interaction = this.rayFilter ();
    this.rayThroughClick (interaction);
  }

  // Only some objects are allowed
  rayFilter (): any {
    // Raycaster with array of results
    this.rayCaster.setFromCamera( this.mouse, this.camera );
    this.intersects = this.rayCaster.intersectObjects( this.scene.children );

    // Only objects that you should interact with
    let rayObjectIntersect: any = null;
    let interactionCheck: Array<string> = [];
    let interaction: any = null;

    for (const intersect of this.intersects) {
      rayObjectIntersect = intersect.object;
      interactionCheck = this.interactionArray.filter((item, i, ar) => ( item === rayObjectIntersect.uuid ));

      if (interactionCheck.length !== 0) {
        interaction = rayObjectIntersect;
        break;
      }
    }

    return interaction;
  }

  rayThroughClick (interaction: any): void {
    if (interaction !== null) {
      this.chronosService.updateClickedObject (this.chronosID, interaction);
    }
  }
}
