import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appScrollTop]'
})
export class ScrollTopDirective {

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollY =  window.scrollY;
    if(scrollY > 100){
        this.renderer.addClass(this.el.nativeElement, 'back-to-top')
    }else{
        this.renderer.removeClass(this.el.nativeElement, 'back-to-top')
    }
  }
}
