export interface IUser {
  id: number;
  name: string;
  lastName: string;
  email: string;
  createdDate: Date;
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
