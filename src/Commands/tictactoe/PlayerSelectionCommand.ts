
import { Command } from '@colyseus/command';
import { WinningCommand } from './Winning';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';
import { Cell } from '../../models/ITicTacToeRoomState';
import { Message } from '../../models/Message';
type Payload = {
 
}
export class PlayerSelectionCommand extends Command<TicTacToeRoom, any> {
  
  execute(data: any) { 
    const { client, index } = data;
    const ci = this.room.state.players.get(client.id).index;
    const cell = (ci === 0) ? Cell.X : Cell.O;
    this.room.state.game_state++;

    this.room.state.board[index] = cell;

    this.room.state.action = Message.PlayerSelection;
    this.room.state.canplay = false;

    return [ 
       new WinningCommand()
    ]
  }


}