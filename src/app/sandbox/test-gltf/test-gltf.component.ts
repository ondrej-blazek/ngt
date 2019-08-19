import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-test-gltf',
  templateUrl: './test-gltf.component.html',
  styleUrls: ['./test-gltf.component.scss']
})
export class TestGLTFComponent implements OnInit {
  private env: EnvService;
  private pointLight: PointLightService;
  private hemiLight: HemiLightService;

  private imagePath: string;
  private imageUrls: string[];

  private gltfPath: string;
  private gltfFileOne: string;
  private gltfFileTwo: string;

  constructor() {
    this.env = new EnvService ();
    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();

    this.imagePath = '/assets/3d/skybox_sun/';
    this.imageUrls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];

    this.gltfPath = '/assets/3d/test_box/';
    this.gltfFileOne = 'testCube_v2a.gltf';
    this.gltfFileTwo = 'testCube_v2b.gltf';
  }

  ngOnInit() {}
}
