"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToeRoom = void 0;
const colyseus_1 = require("colyseus");
const player_1 = require("../models/player");
const user_1 = require("../models/user");
const Message_1 = require("../models/Message");
const command_1 = require("@colyseus/command");
const PlayerSelectionCommand_1 = __importDefault(require("../Commands/PlayerSelectionCommand"));
const TicTacToeRoomState_1 = __importDefault(require("./schema/TicTacToeRoomState"));
class TicTacToeRoom extends colyseus_1.Room {
    constructor() {
        super(...arguments);
        this.max_clients = 2;
        this.dispatcher = new command_1.Dispatcher(this);
    }
    onCreate(options) {
        this.setState(new TicTacToeRoomState_1.default(this, 0, this.max_clients, 0.20));
        this.maxClients = this.max_clients;
        this.onMessage(Message_1.Message.PlayerSelection, (client, message) => {
            const ps = new PlayerSelectionCommand_1.default();
            this.dispatcher.dispatch(ps, {
                client,
                index: message.index
            });
            //this.broadcast(Message.NewSelection, message, { except: client }); 
            console.log(message);
        });
        this.setMetadata({ friendlyFire: true });
        // console.log("room", this.roomId, "creating...", options);
    }
    onJoin(client, options) {
        if (this.state.players.size < this.state.max_player) {
            let p = new player_1.Player(new user_1.User(), options, client, this.state.players.size);
            if (this.state.players.size == 0) {
                this.state.players.set(client.sessionId, p);
                this.state.setHost(p);
                //console.log("First player add in ", this.roomId);
            }
            else if (this.state.players.size == 1) {
                // this.state.init();
                this.state.players.set(client.sessionId, p);
                // console.log("Other player add in ", this.roomId);
                this.lock();
            }
        }
        else {
            console.log("nom_place", "joined!", options);
        }
    }
    onLeave(client, consented) {
        //  console.log(client.sessionId, "left!");
        this.state.players.delete(client.sessionId);
        if (this.state.players.size == 1 && this.state.start) {
            this.state.game_state = 8;
        }
    }
    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }
}
exports.TicTacToeRoom = TicTacToeRoom;
