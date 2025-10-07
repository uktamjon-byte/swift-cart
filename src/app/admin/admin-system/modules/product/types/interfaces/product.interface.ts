import { ReviewStatus } from '../enams/product.enam';

export interface IProduct {
  name: string;
  id: number;
  isEnabled: boolean;
  images: Image;
  price: number;
  availability: string;
  updatedDate: Date;
}

interface Image {
  title: string;
  id: number;
  checked: boolean;
  link: string;
  date: Date;
}

export interface IProductCategory {
  id: number; // unique category ID
  title: string; // category name
  thumbnail: string; // image URL
  date: Date; // date when category was created
}

export interface Brand {
  id: number;
  title: string;
  date: Date;
  logo: string; // usually image URL or path
  status: boolean; // true = active, false = inactive
}

export interface UserReview {
  id: number;
  productName: string;
  reviewerName: string;
  status: ReviewStatus;
  rating: number; // 1–5
  date: Date;
}

export interface Tag {
  id: number;
  name: string;
  date: Date;
}
