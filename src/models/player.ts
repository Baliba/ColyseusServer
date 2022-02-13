import { User } from "./user";
import { Zoe } from "./zoe";
import { Schema, type } from '@colyseus/schema';
import { Client } from 'colyseus';

export class Player extends Schema{ 

  identity: User;

  @type("string")
  un: string;

  @type("string")
  sessionId: string;

  @type([Zoe])
  hand: Zoe[] = [];
  
  client: Client;
  
  @type("number")
  public index: number;
  
  @type("boolean")
  is_in_game: boolean;

  @type("boolean")
  turn: boolean;

  constructor(u: User, data:any, client:Client, index: number) {  
    super();
    this.identity = u;
    this.turn = false;
    this.is_in_game = false;
    this.un = data.name;
    this.client = client;
    this.sessionId = client.sessionId;
    this.index = index;
  }

  myTurn() { 
    this.turn = true;
  }

  notMyTurn() { 
    this.turn = false;
  }

  inGame() { 
    this.is_in_game = true;
  }

  notInGame() { 
    this.is_in_game = false;
  }
  
  
  setHand(o:Zoe[]){ 
    this.hand = o;
  }

}