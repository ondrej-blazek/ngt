import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ui-layers',
  templateUrl: './ui-layers.component.html',
  styleUrls: ['./ui-layers.component.scss']
})
export class UiLayersComponent implements OnInit {
  // Params
  @Input() status: boolean = false;
  @Input() id: number;
  @Output() statusChange = new EventEmitter();

  constructor() {
    this.status = false;
    this.id = 0;
  }
  ngOnInit() {}

  toggleSwitch ():void {
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
