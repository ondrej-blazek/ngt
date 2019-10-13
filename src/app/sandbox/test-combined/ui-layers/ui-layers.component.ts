import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-layers',
  templateUrl: './ui-layers.component.html',
  styleUrls: ['./ui-layers.component.scss']
})
export class UiLayersComponent {
  // Params
  @Input() status: boolean;
  @Input() id: number;
  @Output() statusChange = new EventEmitter();

  constructor() {
    this.status = false;
    this.id = 0;
  }

  toggleSwitch (): void {
    // Status switch
    if (this.status) {
      this.status = false;
    } else {
      this.status = true;
    }

    // Emit event to parent component
    this.statusChange.emit(this.status);
  }
}
