export interface ICategory{
    id?:number,
    name: string;
    subcategories?: ICategory[]; // Optional for nested subcategories
    isParent?: boolean; // Track if submenu is open
}

