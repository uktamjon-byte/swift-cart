export interface ITag {
  id: number;
  title: string;
  isActive?: boolean;
}

export interface IPost {
  id?: number;
  title: string;
  description: string;
  isActive: boolean;
  imageId: number;
  createdAt?: string;
  updatedAt?: string;
  tags: ITag[];
}

export interface IAdminPost {
  id: number;
  title: string;
  description: string;
  imageId: number;
  isActive: boolean;
  userId: number;
  createdAt: string;
  updatedAt: string;
  blogImage: IBlogImage;
  tags: ITag[];
}

export interface IBlogImage {
  id: number;
  uniqueName: string;
}

export interface ICommentPostDetail {
  id: number;
  author: string;
  blogId: number;
  email: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  message: string;
}
