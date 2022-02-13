
import { Command } from '@colyseus/command';
import { NextTurnCommand } from './NextTurnCommand';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';
import { User } from '../../models/user';
import { NewRoundCommand } from './NewRoun';
import { Player } from '../../models/player';

export class NewUserCommand extends Command<TicTacToeRoom, any> {
  constructor() {
    super();
  }  
  execute(data: any) {  
    let  { client, options } = data;

    if (this.room.state.players.size < this.room.maxClients) {

      let p = new Player(new User(), options, client, this.room.state.players.size);
      this.room.state.players.set(client.sessionId, p);
        if (this.room.state.players.size == 0) {
              this.room.state.setHost(p);
        } 
      if (this.room.state.players.size == this.room.maxClients) { 
          this.room.lock();
          return [
           new NewRoundCommand()
         ];
      }
    } 
  }
 
}