import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService, DynamicContentServiceService } from './3d_content';
import { ProjectorServiceA, ProjectorServiceB } from './2d_content';

@Component({
  selector: 'app-test-gltf-lights',
  templateUrl: './test-gltf-lights.component.html',
  styleUrls: ['./test-gltf-lights.component.scss']
})
export class TestGLTFLightsComponent implements OnInit {
  private env: EnvService;
  private gltfPath: string;
  private gltfFileOne: string;

  public dynamic: DynamicContentServiceService;
  public projectorA: ProjectorServiceA = new ProjectorServiceA ();
  public projectorB: ProjectorServiceB = new ProjectorServiceB ();

  constructor() {
    this.env = new EnvService ();
    this.gltfPath = '/assets/3d/test_lights/';
    this.gltfFileOne = 'lights_v5.gltf';
    this.dynamic = new DynamicContentServiceService();
  }

  ngOnInit() {}
}
