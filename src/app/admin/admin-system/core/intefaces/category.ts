export interface ICategories {
  name: string;
  id: number;
  isParent: boolean;
  icon: string;
  isOpen: boolean;
  link: string;
  subcategories?: ISubcategories[];
}

interface ISubcategories {
  name: string;
  id: number;
  subLink: string;
}
