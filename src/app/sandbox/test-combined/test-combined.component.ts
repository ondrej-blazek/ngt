import { Component, OnInit } from '@angular/core';
import * as THREE from 'three';

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
  CloudService
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

  // 3D
  public camPosition: THREE.Vector3;
  public isVRMode: boolean;
  public backgroundColor: THREE.Color;

  public lightPosition: THREE.Vector3;
  public hemPosition: THREE.Vector3;

  public cubeA: CubeContentServiceService;
  public cubeAOffset: THREE.Vector3;
  public cubeARotation: THREE.Euler;
  public cubeAScale: THREE.Vector3;

  public cubeB: CubeContentServiceService;
  public cubeBOffset: THREE.Vector3;
  public cubeBRotation: THREE.Euler;
  public cubeBScale: THREE.Vector3;

  public sphereA: SphereContentServiceService;
  public sphereAOffset: THREE.Vector3;
  public sphereARotation: THREE.Euler;
  public sphereAScale: THREE.Vector3;

  public sphereB: SphereContentServiceService;
  public sphereBOffset: THREE.Vector3;
  public sphereBRotation: THREE.Euler;
  public sphereBScale: THREE.Vector3;

  public dynamic: DynamicContentServiceService;
  public dynamicOffset: THREE.Vector3;
  public dynamicRotation: THREE.Euler;
  public dynamicScale: THREE.Vector3;
  public dynamicAnimate: boolean;

  public pointLight: PointLightService;
  public hemiLight: HemiLightService;

  constructor () {
    // 2D
    this.rectangle = new RectangleService ();
    this.dot = new DotService ();
    this.cloud = new CloudService ();

    // 3D
    this.camPosition = new THREE.Vector3(50, 75, 100);
    this.isVRMode = false;
    this.backgroundColor = new THREE.Color(0xffffff);

    this.lightPosition = new THREE.Vector3(-30, 75, 15);
    this.hemPosition = new THREE.Vector3(0, 1, 0);

    this.cubeA = new CubeContentServiceService();
    this.cubeAOffset = new THREE.Vector3(0, 10, 0);
    this.cubeARotation = new THREE.Euler(0, 0, THREE.Math.degToRad(30), 'XYZ');
    this.cubeAScale = new THREE.Vector3(0.5, 2, 1);

    this.cubeB = new CubeContentServiceService();
    this.cubeBOffset = new THREE.Vector3(-12, 10, 0);
    this.cubeBRotation = new THREE.Euler(0, THREE.Math.degToRad(45), THREE.Math.degToRad(30), 'XYZ');
    this.cubeBScale = new THREE.Vector3(1, 0.5, 1);

    this.sphereA = new SphereContentServiceService();
    this.sphereAOffset = new THREE.Vector3(11, 10, 0);
    this.sphereARotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.sphereAScale = new THREE.Vector3(1, 0.5, 2);

    this.sphereB = new SphereContentServiceService();
    this.sphereBOffset = new THREE.Vector3(0, 10, -10);
    this.sphereBRotation = new THREE.Euler(0, 0, 0, 'XYZ');
    this.sphereBScale = new THREE.Vector3(0.5, 1, 1);

    this.dynamic = new DynamicContentServiceService();
    this.dynamicOffset = new THREE.Vector3(0, 0, 0);
    this.dynamicRotation = new THREE.Euler(0, THREE.Math.degToRad(-45), THREE.Math.degToRad(45), 'XYZ');
    this.dynamicScale = new THREE.Vector3(2.5, 0.5, 2.5);
    this.dynamicAnimate = true;


    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();
  }

  ngOnInit() {}
}
