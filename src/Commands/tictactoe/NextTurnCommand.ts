 
import { Command } from '@colyseus/command';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';
type Payload = {
}
export class NextTurnCommand extends Command<TicTacToeRoom, any> {
  
  execute() { 
    const activePlayer = this.room.state.activePlayer;
    this.room.state.canplay = true;
    if (activePlayer === 0) { 
         this.room.state.activePlayer = 1;
       } else { 
         this.room.state.activePlayer = 0;
    }
    // console.log("TURN:", this.room.state.activePlayer )
  }
}