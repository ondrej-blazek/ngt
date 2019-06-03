import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-helmet',
  templateUrl: './helmet.component.html',
  styleUrls: ['./helmet.component.scss']
})
export class HelmetComponent implements OnInit {
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

    this.imagePath = '/assets/bridge/';
    this.imageUrls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];

    this.gltfPath = '/assets/damaged_helmet/';
    this.gltfFile = 'DamagedHelmet.gltf';

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
