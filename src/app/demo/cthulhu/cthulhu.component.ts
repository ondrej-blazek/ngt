import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-cthulhu',
  templateUrl: './cthulhu.component.html',
  styleUrls: ['./cthulhu.component.scss']
})
export class CthulhuComponent implements OnInit {
  private env: EnvService;
  private pointLight: PointLightService;
  private hemiLight: HemiLightService;

  private gltfPath: string;
  private gltfFile: string;

  // Layers
  public layers: any[];

  constructor() {
    this.env = new EnvService ();
    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();

    this.gltfPath = '/assets/3d/cthulhu/';
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
