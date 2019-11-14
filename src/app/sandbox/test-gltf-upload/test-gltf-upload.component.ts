import { Component, OnInit } from '@angular/core';

import { EnvService } from './service';
import { PointLightService, HemiLightService } from './3d_content';

@Component({
  selector: 'app-test-gltf-upload',
  templateUrl: './test-gltf-upload.component.html',
  styleUrls: ['./test-gltf-upload.component.scss']
})
export class TestGltfUploadComponent implements OnInit {
  private env: EnvService;
  private pointLight: PointLightService;
  private hemiLight: HemiLightService;

  private imagePath: string;
  private imageUrls: string[];

  private gltfPathA: string;
  private gltfFileA: string;

  private fileToUpload: File = null;
  private gltfData: string | ArrayBuffer;
  
  // Layers
  public layers: any[];

  constructor() {
    this.env = new EnvService ();
    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();

    this.imagePath = '/assets/3d/skybox_sun/';
    this.imageUrls = ['px.jpg', 'nx.jpg', 'py.jpg', 'ny.jpg', 'pz.jpg', 'nz.jpg'];

    this.gltfPathA = '/assets/3d/audi/';
    this.gltfFileA = 'audi_r8_wip-3.gltf';

    this.gltfData = null;
  }

  ngOnInit() {}

  handleFileInput(file: FileList) {
    console.log ('file', file);
    this.fileToUpload = file.item(0);
    console.log ('this.fileToUpload', this.fileToUpload);

    // read the file
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      // console.log('fileReader.result', fileReader.result);
      this.gltfData = fileReader.result;
    }
    fileReader.readAsText(this.fileToUpload);
  }
}
