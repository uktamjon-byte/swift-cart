export interface ISelectedCartProduct {
    productTitle:string,
    id:number,
    imgSrc:string,
    unitPrice:number,
    linePrice:number,
    quantity:number
}
export interface IOrderProduct {
    imgSrc:string,
    productTitle:string,
    linePrice:number
}