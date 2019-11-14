import { Component } from '@angular/core';

import { EnvService } from './service';
import { DynamicContentServiceService } from './3d_content';
import { ProjectorServiceA, ProjectorServiceB } from './2d_content';

@Component({
  selector: 'app-test-gltf-lights',
  templateUrl: './test-gltf-lights.component.html',
  styleUrls: ['./test-gltf-lights.component.scss']
})
export class TestGLTFLightsComponent {
  private env: EnvService;
  private gltfPath: string;
  private gltfFileOne: string;

  public dynamic: DynamicContentServiceService;
  public projectorA: ProjectorServiceA = new ProjectorServiceA ();
  public projectorB: ProjectorServiceB = new ProjectorServiceB ();
  public cameras: any[];
  public cameraIndex: number;

  constructor() {
    this.env = new EnvService ();
    this.gltfPath = '/assets/3d/test_lights/';
    this.gltfFileOne = 'lights_v5.gltf';
    this.dynamic = new DynamicContentServiceService();

    // Cameras - Hardcoded
    this.cameras = [
      {
        name: 'Initial',
        index: 1
      },
      {
        name: 'Default',
        index: 2
      },
      {
        name: 'Camera 1',
        index: 3
      },
      {
        name: 'Camera 2',
        index: 4
      }
    ];
    this.cameraIndex = 0;
  }
}
