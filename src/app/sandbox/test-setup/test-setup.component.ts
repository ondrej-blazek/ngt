import { Component, OnInit } from '@angular/core';
import { CubeContentServiceService, SphereContentServiceService, DynamicContentServiceService } from './content';

@Component({
  selector: 'app-test-setup',
  templateUrl: './test-setup.component.html',
  styleUrls: ['./test-setup.component.scss']
})
export class TestSetupComponent implements OnInit {
  public camPosition: number[];
  public ligPosition: number[];
  public hemPosition: number[];
  public helpersFlag: boolean;
  public isVRMode: boolean;

  public cubeA: CubeContentServiceService;
  public cubeB: CubeContentServiceService;
  public sphereA: SphereContentServiceService;
  public sphereB: SphereContentServiceService;
  public dynamic: DynamicContentServiceService;

  constructor() {
    this.helpersFlag = true;
    this.camPosition = [50, 75, 100];
    this.ligPosition = [-30, 75, 15];
    this.hemPosition = [0, 0, 0];
    this.isVRMode = false;

    this.cubeA = new CubeContentServiceService();
    this.cubeB = new CubeContentServiceService();
    this.sphereA = new SphereContentServiceService();
    this.sphereB = new SphereContentServiceService();
    this.dynamic = new DynamicContentServiceService();
  }

  ngOnInit() {}
}
