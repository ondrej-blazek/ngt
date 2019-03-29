import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-test-setup',
  templateUrl: './test-setup.component.html',
  styleUrls: ['./test-setup.component.scss']
})
export class TestSetupComponent implements OnInit {
  public helpersFlag: boolean;
  public camPosition: number[];
  public isVRMode: boolean;

  constructor() {
    this.helpersFlag = true;
    this.camPosition = [50, 75, 100];
    this.isVRMode = false;
  }

  ngOnInit() {}
}
