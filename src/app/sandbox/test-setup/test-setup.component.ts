import { Component, OnInit } from '@angular/core';
import { CubeContentServiceService } from './content';

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

  public cubeContent: CubeContentServiceService;
  public cubiContent: CubeContentServiceService;

  constructor() {
    this.helpersFlag = true;
    this.camPosition = [50, 75, 100];
    this.ligPosition = [-30, 75, 15];
    this.hemPosition = [0, 0, 0];
    this.isVRMode = false;

    this.cubeContent = new CubeContentServiceService();
    this.cubiContent = new CubeContentServiceService();
  }

  ngOnInit() {}
}
