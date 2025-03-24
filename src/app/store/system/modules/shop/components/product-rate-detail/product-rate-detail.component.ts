import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IProduct, IProductSpacification } from '../../types/interfaces/interfaces';

@Component({
  selector: 'app-product-rate-detail',
  templateUrl: './product-rate-detail.component.html',
  styleUrls: ['./product-rate-detail.component.scss']
})
export class ProductRateDetailComponent implements OnInit {
  @Input() details:IProduct | null = null
 reviewForm:FormGroup;
 stars: number[] = Array(5).fill(0); // Creates an array with 5 elements
 selectedRating: number = 0; // Stores the selected rating (1 to 5)
 hoveredRating: number = 0; // Stores the hovered rating
 submitted:boolean = false;
 activeInfoLink: number = 0;

 public productsSP:IProductSpacification[]=[
  {
    mainTitle: "Laptop Specifications",
    items: [
        { name: "Processor", description: "Intel Core i7 12700H" },
        { name: "RAM", description: "16GB DDR5 4800MHz" },
        { name: "Storage", description: "1TB NVMe SSD" },
        { name: "Display", description: "15.6-inch 165Hz IPS Panel" },
        { name: "Graphics Card", description: "NVIDIA RTX 4060 8GB" }
    ]
},
{
    mainTitle: "Smartphone Specifications",
    items: [
        { name: "Processor", description: "Snapdragon 8 Gen 2" },
        { name: "RAM", description: "12GB LPDDR5X" },
        { name: "Storage", description: "256GB UFS 4.0" },
        { name: "Camera", description: "50MP + 12MP + 10MP Triple Camera Setup" },
        { name: "Battery", description: "5000mAh with 65W Fast Charging" }
    ]
},
{
    mainTitle: "Gaming Monitor Specifications",
    items: [
        { name: "Screen Size", description: "27 inches" },
        { name: "Resolution", description: "2560 x 1440 (QHD)" },
        { name: "Refresh Rate", description: "165Hz" },
        { name: "Panel Type", description: "IPS" },
        { name: "Response Time", description: "1ms GTG" }
    ]
}
 ];

  constructor() { 
    this.reviewForm = new FormGroup({
          rating: new FormControl('', Validators.required),
          name: new FormControl('', Validators.required),
          comment: new FormControl('', Validators.required)
       });
  }

  ngOnInit(): void {
  }

  rate(star: number) {
    this.selectedRating = star;
    this.reviewForm.patchValue({rating:star})
  }

  hover(star: number) {
    this.hoveredRating = star;
  }

  resetHover() {
    this.hoveredRating = 0;
  }

  toggleUnderline(index: number) {
    this.activeInfoLink = index;
 }

 onSubmit(){
  this.submitted = true;
 }
}
