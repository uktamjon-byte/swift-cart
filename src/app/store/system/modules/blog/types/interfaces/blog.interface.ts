export interface IPostBlog {
    postTitle:string,
    id:number,
    imgSrc:string,
    date:Date,
    author:string,
    details:IDetailsList,
}
export interface IDetailsList {
   content:string,
   tags:string[]
}