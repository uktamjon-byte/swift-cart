export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  image: string;
  password?: any;
  isActive: boolean;
  createdDate: Date;
}

export interface IAdminUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
  isActive: boolean;
  roleId: number;
  role: {
    name: string;
  };
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface IPermission {
  id: number;
  name: string;
  description: string;
  code: number;
  enable?: boolean;
  createdDate?: Date;
  updatedDate?: Date;
}

export interface IRole {
  id: number;
  name: string;
  description: string;
  permissions: IPermission[];
}
