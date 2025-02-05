import { Directive, ElementRef, Renderer2, HostListener } from '@angular/core';

@Directive({
  selector: '[appSticky]'
})
export class StickyDirective {
  private lastScrollTop: number = 0;
  private isFixed: boolean = false; // Start with the header in its original position

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const scrollTop =  document.documentElement.scrollTop+80;

    if (scrollTop > 100 && !this.isFixed) {
      // User scrolled down past 100px - fix the header
        this.renderer.addClass(this.el.nativeElement, 'fixed-top');
        this.renderer.addClass(this.el.nativeElement, 'visible');
        this.isFixed = true;
    } else if (scrollTop <= 100 && this.isFixed) {
      // User scrolled back to the top - reset the header
         this.renderer.removeClass(this.el.nativeElement, 'fixed-top');
         this.renderer.removeClass(this.el.nativeElement, 'visible');
         this.isFixed = false;
    }
  }
}
