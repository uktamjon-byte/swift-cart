import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ICategory } from "../types/interfaces";


@Injectable()
export class CategoriesService {
    categories:ICategory[]= [];
  constructor(private http: HttpClient) {
    this.categories.push(
        {
            name: "Electronics",
            id:1,
            isParent: true,
            subcategories: [
              {
                name: "Mobile Accessories",
                id:1,
                isParent: true,
                subcategories: [
                  { name: "Cables"},
                  { name: "Chargers"},
                  { name: "Power Bank"},
                  { name: "Headphones"},
                  { name: "Screen Protectors "}
                ]
              },
              {
                name: "Hot Brands",
                id:2,
                isParent: true,
                subcategories: [
                  { name: "OnePlus" },
                  { name: "Apple" },
                  { name: "Samsung" },
                  { name: "Huawei" },
                  { name: "Sony" }
                ]
              },
              {
                name: "Laptops",
                id:3,
                isParent: true,
                subcategories: [
                  { name: "MacBook" },
                  { name: "Gaming" },
                  { name: "Ultraslim" },
                  { name: "Tablets" },
                  { name: "All Laptops" }
                ]
              },
              {
                name: "Computer Accessories",
                id:4,
                isParent: true,
                subcategories: [
                  { name: "Monitors" },
                  { name: "Keyboard & Mouse" },
                  { name: "Pendrive" },
                  { name: "Tablets" },
                  { name: "Speaker" }
                ]
              },
              { name: "Earbuds", id:5, isParent:false }
            ]
          },
          { name: "Men's Fashion" ,id:2, isParent:false},
          { name: "Consumer Electronics" ,id:2, isParent:false },
          { name: "Watches" ,id:2, isParent:false },
          { name: "Home Appliances",id:2, isParent:false },
          { name: "Backpacks" ,id:2, isParent:false },
          { name: "Women's Fashion" ,id:2, isParent:false }
    )
  }


}