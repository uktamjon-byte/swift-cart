import { Injectable } from '@angular/core';
import { IProduct } from '../types/interfaces/product.interface';
import { ProductStatus } from 'src/app/store/system/modules/shop/types/enums/enums';

@Injectable({ providedIn: 'root' })
export class ProductService {
  products: IProduct[] = [
    {
      name: 'Smartphone X200',
      id: 1,
      isEnabled: true,
      price: 599.99,
      availability: ProductStatus.out,
      updatedDate: new Date('2025-09-01'),
      images: {
        title: 'Front View',
        id: 101,
        checked: true,
        link: 'assets/imagis/product1.jpg',
        date: new Date('2025-09-04'),
      },
    },
    {
      name: 'Laptop Pro 15',
      id: 2,
      isEnabled: true,
      price: 1299.99,
      availability: ProductStatus.new,
      updatedDate: new Date('2025-09-01'),
      images: {
        title: 'Laptop Side View',
        id: 102,
        checked: false,
        link: 'assets/imagis/product1.jpg',
        date: new Date('2025-08-20'),
      },
    },
    {
      name: 'Wireless Headphones Z',
      id: 3,
      isEnabled: false,
      price: 199.99,
      availability: ProductStatus.new,
      updatedDate: new Date('2025-09-01'),
      images: {
        title: 'Headphones',
        id: 103,
        checked: true,
        link: 'assets/imagis/product1.jpg',
        date: new Date('2025-07-15'),
      },
    },
    {
      name: 'Smartwatch S5',
      id: 4,
      isEnabled: true,
      price: 249.99,
      availability: ProductStatus.in,
      updatedDate: new Date('2025-09-01'),
      images: {
        title: 'Smartwatch',
        id: 104,
        checked: false,
        link: 'assets/imagis/product1.jpg',
        date: new Date('2025-09-01'),
      },
    },
    {
      name: 'Tablet Max 12',
      id: 5,
      isEnabled: false,
      price: 799.99,
      availability: ProductStatus.out,
      updatedDate: new Date('2025-09-01'),
      images: {
        title: 'Tablet Display',
        id: 105,
        checked: true,
        link: 'assets/imagis/product1.jpg',
        date: new Date('2025-06-30'),
      },
    },
  ];
}
