
import { Player } from "../../../models/player";
import { Schema, MapSchema, type, ArraySchema  } from "@colyseus/schema";
import { Delayed } from "@colyseus/core";
import { Message } from "../../../models/Message";
import { PARAMS } from "../../../Config/Tictactoe/TictacToeConfig";

export default class TicTacToeRoomState extends Schema {


  @type({ map: Player })
  players = new MapSchema<Player>();


  @type(Player)
  host: Player;

  @type(['number'])
  public board:  ArraySchema<number>;


  @type("number")
  activePlayer: number;

  @type("number")
  game_state = 0;

  @type("number")
  game_price = 0;

  @type("number")
  win_price: number;
 

  @type("number")
  com: number;


  @type("boolean")
  start: boolean;
  
  @type("number")
  action: Message;


  @type("boolean")
  canplay: boolean;

  @type("boolean")
  gameOver: boolean;

  @type("number")
  winner: number;

  constructor(price: number) {
    super();
    this.game_price = price;
    this.com = PARAMS.COM;
    let e = 0;
    this.start = false;
    this.board = new ArraySchema(
      e, e, e,
      e, e, e,
      e,e,e
    );
    this.canplay = false;
  }
  
  setHost(p: any) { 
    this.host = p;
  }
  

  init() {
    this.canplay = true;
  }
}
