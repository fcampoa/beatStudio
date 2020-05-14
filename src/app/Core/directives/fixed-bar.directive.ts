import { Directive, ElementRef, Renderer2, OnInit } from '@angular/core';

@Directive({
  selector: '[appFixedBar]'
})
export class FixedBarDirective implements OnInit {

  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.addClass(this.el.nativeElement, 'fixed-bar');
   // this.renderer.addClass(this.el.nativeElement, 'fixed-top');
  }
}
