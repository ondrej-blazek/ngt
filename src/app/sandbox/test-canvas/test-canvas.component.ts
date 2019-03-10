import { Component, OnInit } from '@angular/core';

import { TestContentServiceService } from './content';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.scss']
})
export class TestCanvasComponent implements OnInit {
  public testContService: TestContentServiceService = new TestContentServiceService;

  constructor() { }
  ngOnInit() {}
}
