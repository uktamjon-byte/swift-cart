import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICategory } from "../types/interfaces";


@Injectable()
export class CategoriesService {
    categories:ICategory[]= [];
constructor(private http: HttpClient) {
this.categories.push(
  {
    name: "category.electronics",
    id: 1,
    isParent: true,
    subcategories: [
      {
        name: "category.mobileAccessories",
        id: 1,
        isParent: true,
        subcategories: [
          { name: "category.cables" },
          { name: "category.chargers" },
          { name: "category.powerBank" },
          { name: "category.headphones" },
          { name: "category.screenProtectors" }
        ]
      },
      {
        name: "category.hotBrands",
        id: 2,
        isParent: true,
        subcategories: [
          { name: "brand.onePlus" },
          { name: "brand.apple" },
          { name: "brand.samsung" },
          { name: "brand.huawei" },
          { name: "brand.sony" }
        ]
      },
      {
        name: "category.laptops",
        id: 3,
        isParent: true,
        subcategories: [
          { name: "laptop.macBook" },
          { name: "laptop.gaming" },
          { name: "laptop.ultraslim" },
          { name: "laptop.tablets" },
          { name: "laptop.allLaptops" }
        ]
      },
      {
        name: "category.computerAccessories",
        id: 4,
        isParent: true,
        subcategories: [
          { name: "accessory.monitors" },
          { name: "accessory.keyboardMouse" },
          { name: "accessory.pendrive" },
          { name: "accessory.tablets" },
          { name: "accessory.speaker" }
        ]
      },
      { name: "category.earbuds", id: 5, isParent: false }
    ]
  },
  { name: "category.mensFashion", id: 2, isParent: false },
  { name: "category.consumerElectronics", id: 3, isParent: false },
  { name: "category.watches", id: 4, isParent: false },
  { name: "category.homeAppliances", id: 5, isParent: false },
  { name: "category.backpacks", id: 6, isParent: false },
  { name: "category.womensFashion", id: 7, isParent: false }
);

  }


}