import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShopService } from '../../../shared/services/shop.service';
import { IFeture, IProduct } from '../../types/interfaces/interfaces';
import { ImageGalleryComponent } from '../../components/image-gallery/image-gallery.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
  activeIndex:number = 0;
  productId:number | null = null;
  activePicture:number = this.activeIndex;
  productDetails:IProduct | null = null;
  isCompareActive:boolean = false;
   public $destroy = new Subject<void>();
  @ViewChild(ImageGalleryComponent) galleryComp: any;
 

  
  constructor(private route:ActivatedRoute, private shopService:ShopService) { 
    
  }
  
 features: IFeture[] = [
  {
    title: 'featureSupportTitle',
    info: 'featureSupportInfo',
    icon: 'headphones'
  },
  {
    title: 'featurePaymentsTitle',
    info: 'featurePaymentsInfo',
    icon: 'wallet'
  },
  {
    title: 'featureSecuredTitle',
    info: 'featureSecuredInfo',
    icon: 'shield'
  },
  {
    title: 'featureShippingTitle',
    info: 'featureShippingInfo',
    icon: 'truck'
  },
  {
    title: 'featureReturnTitle',
    info: 'featureReturnInfo',
    icon: 'calendar'
  }
];

  


  ngAfterViewInit(): void {
    setTimeout(() => {
      console.log('childcomp', this.galleryComp);
      if (this.galleryComp) {
        this.galleryComp.activeIndex.subscribe((val: any) => {
          this.activeIndex = val;
        });
      }
    });
  }

  

  getProductStatus(status:any){
     switch(status){
      case 'Out of Stock': return 'out-of-stock';
      case 'New': return 'new';
      case 'In stock': return 'in-stock';
      default: return '';
     }
  }

  
  

  ngOnInit() {
    this.route.params
    .pipe(takeUntil(this.$destroy))
    .subscribe((params)=>{
       this.productId = +params['id'];
       console.log('id', this.productId)
       this.productDetails = this.shopService.pruduct.find(product => product.id === this.productId) || null;
       console.log('lllll', this.productDetails)
    })

   
  }

  

  displayPicture(index:number){
    if (this.galleryComp) {
      this.galleryComp.openLightbox(index);
      this.galleryComp.activePicture = index
    } 
  }

  prev() {
    const activeElement = document.querySelector('.carousel-item.active'); // Get the active image
    if (!activeElement || !this.productDetails?.image) return;
  
    const items = Array.from(document.querySelectorAll('.carousel-item')); // Get all images
    const currentIndex = items.indexOf(activeElement); // Find current active image index
  
    const newIndex = (currentIndex - 1 + items.length) % items.length; // Calculate previous index
    this.updateActiveImage(newIndex);
  }
  
  next() {
    const activeElement = document.querySelector('.carousel-item.active'); // Get the active image
    if (!activeElement || !this.productDetails?.image) return;
  
    const items = Array.from(document.querySelectorAll('.carousel-item')); // Get all images
    const currentIndex = items.indexOf(activeElement); // Find current active image index
  
    let newIndex = (currentIndex + 1) //% items.length;  Calculate next index
    if(newIndex === items.length){
        newIndex = 0
    }
    this.updateActiveImage(newIndex);
  }
  
  updateActiveImage(index: number) {
    this.activeIndex = index; // Update activeIndex dynamically
    this.galleryComp.activePicture = index;
  }
  
  ngOnDestroy() {
    this.$destroy.next();
    this.$destroy.complete();
  }

}
