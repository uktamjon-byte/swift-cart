import { ProductStatus } from "../enums/enums";

export interface IProduct{
    id:number,
    title:string,
    price:number,
    image:string[],
    description:string,
    rating:number,
    status:ProductStatus,
    category:string,
    tags:string[],
    details?:string,
    techDetails?:string
}

export interface IFeture{
    title:string,
    info:string,
    icon:string
}

export interface IProductSpacification {
    mainTitle:string;
    items:IPrSpItem[];
}

export interface IPrSpItem {
    name:string;
    description:string
}