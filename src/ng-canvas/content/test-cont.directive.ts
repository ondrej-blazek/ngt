import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[testCont]'
})
export class TestContDirective {

  // private attributes: NamedNodeMap;

  constructor(
    // private el: ElementRef
  ) {
    console.log('TestContDirective - constructor');
  }

  ngAfterViewInit(){
    // this.attributes = this.el.nativeElement.attributes;
    // console.log('TestContDirective - ngAfterViewInit', this.attributes);
  }

  logSomething(text){
    console.log('from custom directive:', text);
  }

}
