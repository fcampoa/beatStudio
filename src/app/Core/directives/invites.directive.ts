import { OnInit, ElementRef, Renderer2, Directive, Input } from '@angular/core';

@Directive({
  selector: '[appInvite]'
})
export class InviteDirective implements OnInit {

  @Input() estilo: string[];
  constructor(private el: ElementRef, private renderer: Renderer2) {

  }

  ngOnInit() {
    this.renderer.setStyle(this.el.nativeElement, this.estilo[0], this.estilo[1]);
  }
}
