
import { Player } from "../../../models/player";
import { Schema, MapSchema, type } from "@colyseus/schema";
import { Deck } from "../../../models/deck";
import { Zoe } from "../../../models/zoe";
import { DominoRoom } from '../DominoRoom';
import { Delayed } from "@colyseus/core";

export class DominoRoomState extends Schema {


  @type({ map: Player })
  players = new MapSchema<Player>();

  @type({ map: Player })
  out_players = new MapSchema<Player>();
  
  @type(Player) 
  host: Player; 

  @type("number")
  game_state = 0;

  @type("number")
  game_price = 0;

  @type("number")
  max_player = 0;

  @type("number")
  win_price: number;

  @type("number")
  number_player: number;

  @type("number")
  number_out_player: number;

  @type("string")
  turn: string;

  @type("number")
  nturn: number;
  
  
  @type("boolean")
  start: boolean;

  @type("number")
  pose: number; 

  deck: Deck;

  cplayer: Player;

  pplayer: Player;
 
  game: any;

  hzoes: Zoe[];
  zoes:  Zoe[];

  @type("boolean")
  canplay = false;
 
  @type("number")
  max_way = 4;
  
  @type("number")
  mode_game = 0;

  @type("boolean")
  firstZoe: any;
  Ground: Zoe;
  ZGround: Zoe[] =[];
  zoe_pose_up: Zoe[] = [];
  zoe_pose_down :  Zoe[]  = [];
  zoe_pose_left: Zoe[]  = [];
  zoe_pose_right: Zoe[] = [];
  BoardFace: Zoe;
  com: number;
  dist = 0;
  room: DominoRoom; 
  // For this example
  public delayedInterval!: Delayed;

  sendZoes() { 
    this.room.clock.start();
    let i = 0;
    this.delayedInterval = this.room.clock.setInterval(() => {
      console.log("Time now " + i +" : "+ this.room.clock.currentTime);
      let j = 0;
      this.players.forEach((element: Player) => {
          if (j == i) {
             this.players.get(element.client.sessionId).inGame();
             this.addZoeToPlayer(element.client.sessionId,j);
          }
         j++;
      });
     
      if (i==this.players.size-1) { 
        this.delayedInterval.clear();
        this.startGame();
        console.log("Time now stop : "+ this.room.clock.currentTime);
      }
      i++;
    }, 1000);
  }

  constructor(room: DominoRoom, price: number, max_player: number, com:number) {
    super();
    this.room = room;
    this.game_price = price;
    this.max_player = max_player;
    this.com = com;
    this.dist = 0;
  }
  
  setHost(p: any) { 
    this.host = p;
  }
  
  deletePlayer(sessionId: string) {
    
  } 

  init() {
    this.game_state = 1;
    this.dist = 0;
    this.start = false;
    this.checkIsReady();
  }

  public checkIsReady() {
    this.canplay = false;
    if(this.players.size > 1) {
       this.number_player = this.players.size;
       this.setWinPrice();
       this.loopOnPlayer(this.resetPlayerHand.bind(this), this.mixAndDistribute.bind(this));
      } else { 
       this.game_state = 0;
    }

  }
  private setWinPrice() {
    if (this.game_price > 0) {
      const tw = (this.number_player * this.game_price);
      const c = tw * this.com;
      this.win_price = tw - c;
     } else { 
      this.win_price = 0;
    }
  }

  resetPlayerHand(i: any) { 
    
    this.players.get(i).hand = [];

  }

  mixAndDistribute() { 
    let d = new Deck('default');
    this.hzoes = d.getZoes();
    this.game = d.shareZoe(this.hzoes);
    this.sendZoes();
   // this.loopOnPlayer(this.addZoeToPlayer.bind(this), this.startGame.bind(this));
  }
  addZoeToPlayer(id: any, dist:number) {
    const zoes = this.game.hands[dist];
    this.players.get(id).setHand(zoes); 
    console.log("send to =>",this.players.get(id).client.sessionId);
    this.room.sendHandToClients(this.players.get(id).client, zoes, dist);
  }

  loopOnPlayer(callBack: any, next:any) { 
    this.players.forEach((element:Player) => {
       callBack(element.client.sessionId); 
    });
    next();
  }

  startGame() { 
    const index = this.random(this.players.size);
    this.firstZoe = true;
    let i = 0;
    this.players.forEach((element: Player) => {
      if (i == index) {
        this.turn = element.client.sessionId;
        this.nturn = i;
        this.players.get(element.client.sessionId).myTurn();
         } else {
          this.players.get(element.client.sessionId).notMyTurn();
        }
      i++;
    });
    this.play();
  }

  nextTurn() { 
    
    if ((this.nturn + 1) >= this.players.size) {
         this.nturn = 0;
    } else { 
       this.nturn++;
    }
    
    this.setTurn();
  }

  setTurn() { 
    let i = 0;
    this.players.forEach((element: Player) => {
      if (i == this.nturn) {
         
          this.turn = element.client.sessionId;
          this.players.get(element.client.sessionId).myTurn();
      } else { 
        this.players.get(element.client.sessionId).notMyTurn();
      }
      i++;
    });
    this.firstZoe = false;
    this.play();
  }

  play() {
    this.pose = this.getTotalZoePoseInit();
    this.players.get(this.turn).myTurn();
    this.canplay = true;
    if (this.pose == 0) {
        this.start = true;
        this.game_state = 10;
    }  else { 
        this.game_state = 20;
    }
  }

  gameOver() {
    this.start = false;
    this.canplay = false;
   }

   random(max:number) {
    return Math.floor(Math.random() * max);
  }

  addZoeV1(zoe: Zoe, way: number = 0) : boolean {
    if (this.Ground == undefined) {
      zoe.setFirst(true);
      this.Ground = zoe;
      this.BoardFace = zoe;
      this.ZGround.push(zoe);
    } else { 
      if (way == 1) {
          return this.goUp( this.Ground, zoe);
      } else { 
          return this.goDown(this.Ground,zoe);
      }
    } 

  }

  addZoeV2(zoe: Zoe, way: number) {
    let pose = false;
    if (this.Ground == undefined) {
      zoe.setFirst(true);
      this.Ground = zoe;
      pose = true;
    } else { 


    }
  }

  public getTotalZoePoseInit() { 
    return   this.zoe_pose_up.length +
             this.zoe_pose_down.length +
             this.zoe_pose_left.length +
             this.zoe_pose_right.length;
    }

  public getTotalZoePose() { 
  return   this.zoe_pose_up.length +
           this.zoe_pose_down.length +
           this.zoe_pose_left.length +
           this.zoe_pose_right.length + 1;
  }


  goUp(zoe: Zoe, nz: Zoe): boolean { 
    if (zoe.getA() == undefined) {
        if (nz.getA()==zoe.getA()  || nz.getB()==zoe.getA()  ) {
             if (nz.getA() == this.BoardFace.getA()) {
                 this.BoardFace.setA(nz.getB());
               } else { 
                 this.BoardFace.setA(nz.getA());
             }
             zoe.setZoeUp(nz);
             this.zoe_pose_up.push(nz);
             return true;
      }
      return false;
    } else { 
        this.goUp(zoe,nz);
    }
    return false;        
  }

  goDown(zoe: Zoe, nz: Zoe): boolean { 
    if (zoe.getB() == undefined) {
      if (nz.getA() == zoe.getB() || nz.getB() == zoe.getB()) {
              if (nz.getA() == this.BoardFace.getB()) {
                  this.BoardFace.setB(nz.getB());
                } else { 
                  this.BoardFace.setB(nz.getA());
              }
             zoe.setZoeDown(nz);
             this.zoe_pose_down.push(nz);
             return true;
       }
      return false;
    } else { 
        this.goUp(zoe,nz);
    }
    return false;        
  }

  goLeft(zoe:Zoe, nz: Zoe) { 
      
  }

  goRight(zoe:Zoe, nz: Zoe) { 
      
  }
  
}
