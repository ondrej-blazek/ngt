import { Directive, Input, OnChanges, OnInit, AfterContentInit, OnDestroy } from '@angular/core';

@Directive({
  selector: 'ngt-object'
})
export class ObjectDirective implements OnChanges, OnInit, AfterContentInit, OnDestroy {
  // element parameters
  @Input() location: number[] = [0, 0, 0];    // THREE.Vector3
  @Input() rotation: number[] = [0, 0, 0];    // THREE.Euler
  @Input() content: any;

  public object: THREE.Mesh;

  constructor() {}

  // Life cycle hooks
  ngOnChanges(changes) {
    if(changes.location) {
      this.location = changes.location.currentValue;
      this.content.setLocation (this.location);
    }
    if(changes.rotation) {
      this.rotation = changes.rotation.currentValue;
      this.content.setRotation (this.rotation);
    }
  }
  ngOnInit():void {
    this.object = this.content.object;
    this.content.setLocation (this.location);
    this.content.setRotation (this.rotation);
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
