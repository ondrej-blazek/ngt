import { Component, OnInit } from '@angular/core';
import { CubeService, SphereService, EnvService } from './service';

import {
  CubeContentServiceService,
  SphereContentServiceService,
  PointLightService,
  HemiLightService
} from './3d_content';
import {
  ProjectorServiceInteractiveBubble,
  ProjectorServiceInteractiveClose
} from './2d_content';

@Component({
  selector: 'app-test-inter-html',
  templateUrl: './test-inter-html.component.html',
  styleUrls: ['./test-inter-html.component.scss']
})
export class TestInnerHTMLComponent implements OnInit {
  // 2D
  public projectorInteractiveBubble: ProjectorServiceInteractiveBubble = new ProjectorServiceInteractiveBubble ();
  public ProjectorInteractiveClose: ProjectorServiceInteractiveClose = new ProjectorServiceInteractiveClose ();

  // 3D
  public env: EnvService;
  public pointLight: PointLightService;
  public hemiLight: HemiLightService;

  public cubes: CubeService;
  public cubeA: CubeContentServiceService;
  public cubeB: CubeContentServiceService;

  public spheres: SphereService;
  public sphereA: SphereContentServiceService;
  public sphereB: SphereContentServiceService;

  constructor () {
    // 3D
    this.env = new EnvService ();
    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();

    this.cubes = new CubeService();
    this.cubeA = new CubeContentServiceService();
    this.cubeB = new CubeContentServiceService();

    this.spheres = new SphereService();
    this.sphereA = new SphereContentServiceService();
    this.sphereB = new SphereContentServiceService();
  }

  ngOnInit() {}
}
