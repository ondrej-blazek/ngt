import { Directive, Input, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'ngt-dynamic'
})
export class DynamicDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  // element parameters
  @Input() uuid: string = '';
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  @Input() rotation: number[] = [0, 0, 0];    // THREE.Euler
  @Input() scale: number[] = [0, 0, 0];       // THREE.Vector3
  @Input() content: any;

  public objectArray: THREE.Mesh[];

  constructor() {}

  // Life cycle hooks
  ngOnChanges(changes) {
    if(changes.location) {
      this.location = changes.location.currentValue;
      // this.content.setLocation (this.location);
    }
    if(changes.rotation) {
      this.rotation = changes.rotation.currentValue;
      // this.content.setRotation (this.rotation);
    }
  }
  ngOnInit():void {
    this.objectArray = this.content.objectArray;
    // this.content.setLocation (this.location);
    // this.content.setRotation (this.rotation);
    // TODO - Scale link to content class
    // TODO - uuID link to content class
  }
  ngAfterContentInit():void {}
  ngOnDestroy():void {}

  // Expose content functions through directive
  render(): void {
    if (this.content) {
      this.content.render();
    }
  }
}
