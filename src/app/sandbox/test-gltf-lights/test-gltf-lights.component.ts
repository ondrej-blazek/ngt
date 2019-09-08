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
  // private pointLight: PointLightService;
  // private hemiLight: HemiLightService;

  // private imagePath: string;
  // private imageUrls: string[];

  private gltfPath: string;
  private gltfFileOne: string;

  public dynamic: DynamicContentServiceService;
  public projectorA: ProjectorServiceA = new ProjectorServiceA ();
  public projectorB: ProjectorServiceB = new ProjectorServiceB ();

  constructor() {
    this.env = new EnvService ();
    // this.pointLight = new PointLightService();
    // this.hemiLight = new HemiLightService();

    // this.imagePath = '/assets/3d/skybox_sun/';
    // this.imageUrls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];

    this.gltfPath = '/assets/3d/test_lights/';
    this.gltfFileOne = 'lights.gltf';

    this.dynamic = new DynamicContentServiceService();
  }

  ngOnInit() {}
}
