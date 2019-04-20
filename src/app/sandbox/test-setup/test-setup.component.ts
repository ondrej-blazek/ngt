import { Component, OnInit } from '@angular/core';
import { CubeContentServiceService, SphereContentServiceService, DynamicContentServiceService, PointLightService, HemiLightService } from './content';
import * as THREE from 'three';

@Component({
  selector: 'app-test-setup',
  templateUrl: './test-setup.component.html',
  styleUrls: ['./test-setup.component.scss']
})
export class TestSetupComponent implements OnInit {
  public helpersFlag: boolean;
  public camPosition: number[];
  public isVRMode: boolean;

  public lightHelpers: boolean;
  public lightAnimate: boolean;
  public lightPosition: THREE.Vector3;
  public hemPosition: THREE.Vector3;

  public cubeA: CubeContentServiceService;
  public cubeB: CubeContentServiceService;
  public sphereA: SphereContentServiceService;
  public sphereB: SphereContentServiceService;
  public dynamic: DynamicContentServiceService;

  public pointLight: PointLightService;
  public hemiLight: HemiLightService;

  constructor() {
    this.helpersFlag = true;
    this.camPosition = [50, 75, 100];
    this.isVRMode = false;

    this.lightHelpers = true;
    this.lightAnimate = false;
    this.lightPosition = new THREE.Vector3(-30, 75, 15);
    this.hemPosition = new THREE.Vector3(0, 1, 0);

    this.cubeA = new CubeContentServiceService();
    this.cubeB = new CubeContentServiceService();
    this.sphereA = new SphereContentServiceService();
    this.sphereB = new SphereContentServiceService();
    this.dynamic = new DynamicContentServiceService();

    this.pointLight = new PointLightService();
    this.hemiLight = new HemiLightService();
  }

  ngOnInit() {}
}
