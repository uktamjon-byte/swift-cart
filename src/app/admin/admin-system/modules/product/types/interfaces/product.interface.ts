import { ReviewStatus } from '../enams/product.enam';

interface IProductImage {
  id: number;
  productImage: { id: number; uniqueName: string };
}

interface Image {
  id: number;
  uniqueName: string;
}

export interface IProductDetail extends IProduct {
  id: number;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  ratingCount: number;
}

export interface IProduct {
  name: string;
  description: string;
  brandId: number;
  categoryId: number;
  unitId: number;
  price: number | string;
  quantity: number;
  isActive: boolean;

  images: number[] | IProductImage;
  seo: ISeo;
}

export interface ISeo {
  title: string;
  description: string;
}

export interface ICategoryDetail extends IProductCategory {
  id: number;
  categoryImage: Image;
  createdAt: string;
  updatedAt: string;
}

export interface IProductCategory {
  name: string;
  description: string;
  isActive: boolean;
  imageId: number;
  date: string;
}

export interface IBrandDetail extends IBrand {
  id: number;
  brandImage: Image;
  createdAt: string;
  updatedAt: string;
}

export interface IBrand {
  name: string;
  description: string;
  date: Date;
  imageId: string;
  isActive: boolean;
}

export interface IUnit {
  id: number;
  name: string;
  shortName: string;
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
