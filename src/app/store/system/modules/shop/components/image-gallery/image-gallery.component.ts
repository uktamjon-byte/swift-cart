import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { IProduct } from '../../types/interfaces/interfaces';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-image-gallery',
  templateUrl: './image-gallery.component.html',
  styleUrls: ['./image-gallery.component.scss']
})
export class ImageGalleryComponent implements OnInit {
  
  @Input() prodDetails:IProduct | null = null;
   public activeIndex = new BehaviorSubject<number>(0);

  images:any = [];
  constructor() { }

  
  ngOnInit(){
    this.images = this.prodDetails?.image
  }
  
  isLightboxOpen = false;
  currentIndex = 0;
  activePicture = 0

  openLightbox(index: number): void {
    this.currentIndex = index;
    this.isLightboxOpen = true;
  }

  activateIndex(index:number){
    this.activeIndex.next(index);
    this.activePicture = index;
  }

  closeLightbox(): void {
    this.isLightboxOpen = false;
  }

  prevImage(event: Event): void {
    event.stopPropagation(); // Prevent closing when clicking buttons
    this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
  }

  nextImage(event: Event): void {
    event.stopPropagation();
    this.currentIndex = (this.currentIndex + 1) % this.images.length;
  }

}
