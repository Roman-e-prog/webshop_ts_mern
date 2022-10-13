import 'express-serve-static-core'
    
export interface User {
  id:string!;
  vorname:string!;
  nachname:string!;
  username:string!;
  email:string!;
  street:string!;
  number:string!;
  plz:number!;
  city:string!;
  password:string!;
  isAdmin:boolean!;
  createdAt: Date!;
  updatedAt: Date!;
}

declare module 'express' {
  export interface Request {
    user?: User
  }
}