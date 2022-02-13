import { MapSchema, ArraySchema } from '@colyseus/schema';
import { Delayed } from 'colyseus';
import { TicTacToeRoom } from '../rooms/Titactoe/TicTacToeRoom';
import { Player } from './player';
export enum Cell { 
  Empty,
  X,
  O
}
export interface ITicTacToeRoomState { 
  players:MapSchema<Player>;
  host: Player;
  board: ArraySchema<number>
  activePlayer:number;
  game_state:number;
  game_price: number;
  max_player: number;
  win_price: number;
  turn: string;
  nturn: number;
  com: number;
  start: boolean;
  room: TicTacToeRoom ; 
  // For this example
  delayedInterval: Delayed;
  canplay: boolean;

  setHost(p: any): void;
  init(): void;
}

export default ITicTacToeRoomState;