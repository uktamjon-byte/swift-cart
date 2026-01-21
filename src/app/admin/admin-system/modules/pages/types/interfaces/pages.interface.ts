export interface IUserRequest {
  name: string;
  email: string;
  question: string;
  phone: string;
}

export interface IFaq {
  id: number;
  title: string;
  description: string;
  isActive: boolean;
}
