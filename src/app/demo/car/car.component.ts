import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-car',
  templateUrl: './car.component.html',
  styleUrls: ['./car.component.scss']
})
export class CarComponent implements OnInit {
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

    this.gltfPath = '/assets/3d/audi/';
    this.gltfFile = 'audi_r8_wip-3.gltf';
  }

  ngOnInit() {}
}
