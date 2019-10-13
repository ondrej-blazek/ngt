import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-cameras',
  templateUrl: './ui-cameras.component.html',
  styleUrls: ['./ui-cameras.component.scss']
})
export class UiCamerasComponent {
  // Params
  @Input() index: number;
  @Input() name: string;
  @Input() status: string;
  @Output() statusChange = new EventEmitter();

  constructor() {
    this.index = 0;
    this.name = '';
  }

  transmitClick (): void {
    // Emit event to parent component
    this.statusChange.emit(this.index);
  }
}
