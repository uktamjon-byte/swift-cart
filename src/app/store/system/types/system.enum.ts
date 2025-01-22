export enum navMenuType{
    categories = 'Categories',
    menu = 'Menu',
    more = 'More',  
}

export interface IFooterMain {
    headerTitile:string;
    hasSocialAccount?:boolean;
    menuList:IHeaderMenuList[];
    isFooterTag?:boolean;
}
export interface IHeaderMenuList {
    title:string;
    isLink:boolean;
    src?:string;
    iconClass?:string;
    id?:number;
}