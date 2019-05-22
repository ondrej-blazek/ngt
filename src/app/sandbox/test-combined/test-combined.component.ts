import { Component, OnInit } from '@angular/core';
// import * as THREE from 'three';

import { CubeService, SphereService, DynamicService, EnvService } from './service';

import {
  CubeContentServiceService,
  SphereContentServiceService,
  DynamicContentServiceService,
  PointLightService,
  HemiLightService
} from './3d_content';
import {
  RectangleService,
  DotService,
  CloudService,
  ProjectorService
} from './2d_content';

@Component({
  selector: 'app-test-combined',
  templateUrl: './test-combined.component.html',
  styleUrls: ['./test-combined.component.scss']
})
export class TestCombinedComponent implements OnInit {
  // 2D
  public rectangle: RectangleService = new RectangleService ();
  public dot: DotService = new DotService ();
  public cloud: CloudService = new CloudService ();
  public projector: ProjectorService = new ProjectorService ();

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

  public dynamics: DynamicService;
  public dynamic: DynamicContentServiceService;

  // Layers
  public layers: any[];

  constructor () {
    // 2D
    this.rectangle = new RectangleService ();
    this.dot = new DotService ();
    this.cloud = new CloudService ();

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

    this.dynamics = new DynamicService ();
    this.dynamic = new DynamicContentServiceService();

    // Layers
    this.layers = [
      {
        layer: 0,
        visible: true
      },
      {
        layer: 1,
        visible: true
      },
      {
        layer: 2,
        visible: false
      }
    ];
  }

  ngOnInit() {}
}
