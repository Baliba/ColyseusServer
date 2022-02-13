import { Room, Client, Delayed } from 'colyseus';
import { Player } from "../../models/player";
import { User } from "../../models/user";
import { Key, Message } from '../../models/Message';
import { Dispatcher } from "@colyseus/command";
import { NewRoundCommand } from '../../Commands/tictactoe/NewRoun';
import { NextTurnCommand } from '../../Commands/tictactoe/NextTurnCommand';
import { PlayerSelectionCommand } from '../../Commands/tictactoe/PlayerSelectionCommand';
import TicTacToeRoomState from './schema/TicTacToeRoomState';
import { NewUserCommand } from '../../Commands/tictactoe/NewUser';
   //this.broadcast(Message.NewSelection, message, { except: client }); 
export class TicTacToeRoom  extends Room<TicTacToeRoomState> {
  dispatcher = new Dispatcher (this);
  public delayedInterval!: Delayed;
  sec = 1;
  win: any = [];
  onCreate(options: any) {
  
    this.maxClients = 2
    this.setState(new TicTacToeRoomState(0));
    this.onMessage(Message.PlayerSelection, (client, message: any) => {
      this.dispatcher.dispatch(new PlayerSelectionCommand() , {
        client,
        index: message.index
      });
    });
    this.setMetadata({ friendlyFire: true });
    this.createWin();
  }
  createWin() { 
    this.win.push(this.getRowWin(0));
    this.win.push(this.getRowWin(1));
    this.win.push(this.getRowWin(2)); 

    this.win.push(this.getColWin(0));
    this.win.push(this.getColWin(1));
    this.win.push(this.getColWin(2)); 
    this.win.push(this.getDiagA());
    this.win.push(this.getDiagB());
  }

  getDiagB() { 
    return [ 
      {
        row: 0,
        col:2
      }
      ,
      {
        row: 1,
        col:1
      }
      ,
      {
        row: 2,
        col:0
      }
    ]
  }
    
  getDiagA() { 
    return [
      {
        row: 0,
        col:0
      }
      ,
      {
        row: 1,
        col:1
      }
      ,
      {
        row: 2,
        col:2
      }
    ]
  }
  getColWin(col: number) {
    let cols = [];
    for (let i = 0; i < 3;i++) { 
      cols.push({
        row: i,
        col:col
      });
    }
    return cols; 
  }
  getRowWin(row: number) {
    let rows = [];
    for (let i = 0; i < 3;i++) { 
      rows.push({
        row: row,
        col:i
      });
    }
    return rows;
  }

  setTurn() {
     this.clock.start();
     this.clock.setTimeout(() => {
        this.delayedInterval.clear();
        this.dispatcher.dispatch(new NextTurnCommand(), {});
      }, 3000);
  }

  onJoin(client: Client, options: any) {

    this.dispatcher.dispatch(new NewUserCommand(), { client, options });
    
  }

  onLeave (client: Client, consented: boolean) {
   //  console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
    if(this.state.players.size == 1 && this.state.start) {
      this.state.game_state = 8;
    }
  }

  onDispose() {
     console.log("room", this.roomId, "disposing...");
  }

}
