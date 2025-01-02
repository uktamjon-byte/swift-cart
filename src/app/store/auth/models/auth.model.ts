export class Login{
    email:string;
    possword:string;
    constructor(
        email:string, 
        password:string
    ){
        this.email = email;
        this.possword = password;
    }
}

export class Regis{
    firstName:string;
    lastName:string;
    email:string;
    phone:number;
    password:string;
    comfirmPassword:string;
    policy?:boolean;
    
     constructor(
        firstName:string,
        lastName:string,
        email:string,
        phone:number,
        password:string,
        comfirmPassword:string,
        policy?:boolean,
     ){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.phone = phone;
        this.password = password;
        this.comfirmPassword = comfirmPassword;
        this.policy = policy
    }

   
}

export class Reset{
    email:string;
    possword:string;
    constructor(
        email:string, 
        password:string
    ){
        this.email = email;
        this.possword = password;
    }
}