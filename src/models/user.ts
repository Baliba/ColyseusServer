import { Schema } from '@colyseus/schema';

export class User extends Schema { 
  id: Number;
  username: String;
  fullName: string
  lastName: string
  token: string
  compte  : number;
  hcompte  : number
}