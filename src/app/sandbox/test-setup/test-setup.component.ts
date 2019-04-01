import { Component, OnInit } from '@angular/core';

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

  constructor() {
    this.helpersFlag = true;
    this.camPosition = [50, 75, 100];
    this.ligPosition = [-30, 75, 15];
    this.hemPosition = [0, 0, 0];
    this.isVRMode = false;
  }

  ngOnInit() {}
}
