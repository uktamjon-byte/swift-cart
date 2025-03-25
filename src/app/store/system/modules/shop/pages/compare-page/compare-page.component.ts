import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compare-page',
  templateUrl: './compare-page.component.html',
  styleUrls: ['./compare-page.component.scss']
})
export class ComparePageComponent implements OnInit {

  constructor() { }
  products = [
    { name: 'Product A', values: ['$10', 'In Stock', 'Electronics'] },
    { name: 'Product B', values: ['$20', 'Out of Stock', 'Clothing'] },
    { name: 'Product C', values: ['$15', 'In Stock', 'Accessories'] },
     //{ name: 'Product d', values: ['$20', 'Out of Stock', 'Clothing'] },
    //  { name: 'Product e', values: ['$15', 'In Stock', 'Accessories'] }
];

featureList = ['Price', 'Stock', 'Category'];

  ngOnInit() {
  }

}
