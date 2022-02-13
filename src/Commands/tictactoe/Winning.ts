
import { Command } from '@colyseus/command';
import { NextTurnCommand } from './NextTurnCommand';
import { TicTacToeRoom } from '../../rooms/Titactoe/TicTacToeRoom';
import { Cell } from '../../models/ITicTacToeRoomState';
import { GameOverCommand } from './GameOver';

export class WinningCommand extends Command<TicTacToeRoom, any> {
  getValueAt(board: number[], row: number, col: number) { 
    let idx = (row * 3) + col;   
    return board[idx]; 
  }
  private determineWin(): boolean {
    let wins = this.room.win;

    const b = this.room.state.board;
    for (let i = 0; i < wins.length; i++) { 
      let hasWinner = true;    
      const win = wins[i];
      for (let j = 1; j < win.length; j++) { 
        const pCell = win[j - 1]  
        const cell = win[j];     
        const pValue = this.getValueAt(b, pCell.row, pCell.col); 
        const cValue = this.getValueAt(b, cell.row, cell.col);
         if (pValue!= cValue || pValue == Cell.Empty) {  
            hasWinner = false;
            break;
         }
      }
  
      if (hasWinner) { 
         return win;
      }  
    }
    return false;
  }
  
  execute() { 

    let win = this.determineWin();
    if (win) {
      return [
        new GameOverCommand().setPayload(win)
      ]
     } else { 
      return [
        new NextTurnCommand()
      ]
    }

  }
}