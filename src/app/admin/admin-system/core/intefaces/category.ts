export interface ICategories {
  name: string;
  id: number;
  isParent: boolean;
  icon: string;
  isOpen: boolean;
  link: string;
  subcategories?: ISubcategories[];
  pattern: string;
  permission?: number;
}

interface ISubcategories {
  name: string;
  id: number;
  subLink: string;
  visible?: boolean;
  permission?: number;
}
