
import { Command } from '@colyseus/command';
import { Client } from 'colyseus';
import { Cell } from '../models/ITicTacToeRoomState';
import { TicTacToeRoom } from '../rooms/Titactoe/TicTacToeRoom';
type Payload = {
  client: Client
  index:number
}
export class TestCommand extends Command<TicTacToeRoom, any> {
  
  execute(data: any) { 
   
  }
}