export interface ILogin{
    email:string;
    possword:string;
}

export interface IRegis{
    firstName:string;
    lastName:string;
    email:string;
    phone:number;
    password:string;
    comfirmPassword:string;
    policy?:boolean;
    
}

export interface IReset{
    email:string;
    possword:string;
}

