
import { Command } from '@colyseus/command';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';

export class NewRoundCommand extends Command<TicTacToeRoom> {
  
  execute() { 

    this.room.state.canplay = true;
    this.room.state.activePlayer = 0;
    this.room.state.start = true;
    console.log("GAME IS READY");
  }
}