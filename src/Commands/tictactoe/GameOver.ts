
import { Command } from '@colyseus/command';
import { NextTurnCommand } from './NextTurnCommand';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';

export class GameOverCommand extends Command<TicTacToeRoom, any> {
  execute() {  
    this.room.state.gameOver = true;
    this.room.state.winner = this.room.state.activePlayer; 
    this.room.state.canplay = false;
    console.log("GAME OVER");
  }
}