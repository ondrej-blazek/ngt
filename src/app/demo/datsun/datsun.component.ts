import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-datsun',
  templateUrl: './datsun.component.html',
  styleUrls: ['./datsun.component.scss']
})
export class DatsunComponent implements OnInit {
  private env: EnvService;
  private pointLight: PointLightService;
  private hemiLight: HemiLightService;

  private imagePath: string;
  private imageUrls: string[];

  private gltfPath: string;
  private gltfFile: string;

  // Layers
  public layers: any[];

  constructor() {
    this.env = new EnvService ();
    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();

    this.imagePath = '/assets/3d/skybox_sun/';
    this.imageUrls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];

    this.gltfPath = '/assets/3d/datsun_1972/';
    this.gltfFile = 'scene.gltf';

    // Layers
    this.layers = [
      {
        layer: 0,
        visible: false
      }
    ];
  }

  ngOnInit() {}
}