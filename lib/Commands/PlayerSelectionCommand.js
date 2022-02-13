"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = require("@colyseus/command");
const ITicTacToeRoomState_1 = require("../models/ITicTacToeRoomState");
class PlayerSelectionCommand extends command_1.Command {
    constructor() {
        super();
    }
    execute(data) {
        const { client, index } = data;
        let room = this.room;
        const clientIndex = room.state.players.get(client.id).index;
        const cellValue = (clientIndex === 0) ? ITicTacToeRoomState_1.Cell.X : ITicTacToeRoomState_1.Cell.O;
        room.state.board[index] = cellValue;
        console.log(data);
    }
}
exports.default = PlayerSelectionCommand;
