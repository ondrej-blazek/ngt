import { Directive, Input, OnChanges, OnInit, AfterContentInit } from '@angular/core';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Subscription } from 'rxjs';

import { ChronosService } from '@ngs/core/chronos.service';

@Directive({
  selector: 'ngt-orbit'     // tslint:disable-line
})
export class OrbitDirective implements OnChanges, OnInit, AfterContentInit {
  @Input() enabled: boolean;
  @Input() controls: any;

  private chronosID: string;
  private renderID: string;
  private subscription: Subscription;
  public orbitControls: OrbitControls;

  constructor (
    private chronosService: ChronosService
  ) {
    this.chronosID = '';
    this.renderID = '';
    this.enabled = true;


    // subscribe to home component messages
    this.subscription = this.chronosService.getMessage().subscribe(
      message => {
        if (message.type === 'activeOverlay') {
          this.enableControls(message.active);
        }
        if (message.type === 'updateOrbitControls') {
          this.updateControls();
        }
      }
    );
  }

  ngOnChanges (changes) {
    if (changes.enabled && changes.enabled.currentValue && this.orbitControls) {
      this.enabled = changes.enabled.currentValue;
      this.orbitControls.enabled = this.enabled;
    }
  }

  ngOnInit () {}
  ngAfterContentInit () {}

  // ---------------------------------------------------------------------------------

  // TODO - Can this DOM element reference be stored in scene service?
  setupControls (camera, renderer): void {
    // Section element as provided by reporter
    const domElement: HTMLElement = this.chronosService.getDOM (this.chronosID);

    // this.orbitControls = new OrbitControls(camera, renderer.domElement);
    this.orbitControls = new OrbitControls(camera, domElement);
    this.orbitControls.enabled = this.enabled;

    if (this.controls) {
      Object.keys(this.controls).forEach(key => {
        this.orbitControls[key] = this.controls[key];
      });
    }
  }

  enableControls (active: boolean): void {
    this.enabled = !active;
    this.orbitControls.enabled = this.enabled;
    this.orbitControls.update();
  }

  updateControls (): void {
    this.orbitControls.update();
  }

  processID (chronosID: string, renderID: string): void {
    this.chronosID = chronosID;
    this.renderID = renderID;
  }
}


// More reading:
//    https://threejs.org/docs/#examples/controls/OrbitControls
