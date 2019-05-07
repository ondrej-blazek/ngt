import { Component, OnInit } from '@angular/core';

import { RectangleService, DotService, CloudService } from './content';

@Component({
  selector: 'app-test-canvas',
  templateUrl: './test-canvas.component.html',
  styleUrls: ['./test-canvas.component.scss']
})
export class TestCanvasComponent implements OnInit {
  public rectangle: RectangleService = new RectangleService ();
  public dot: DotService = new DotService ();
  public cloud: CloudService = new CloudService ();

  constructor() { }
  ngOnInit() {}
}
