"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const player_1 = require("../../models/player");
const schema_1 = require("@colyseus/schema");
class TicTacToeRoomState extends schema_1.Schema {
    constructor(room, price, max_player, com) {
        super();
        this.players = new schema_1.MapSchema();
        this.activePlayer = 0;
        this.game_state = 0;
        this.game_price = 0;
        this.max_player = 0;
        this.room = room;
        this.game_price = price;
        this.max_player = max_player;
        this.com = com;
        let e = 0;
        this.board = new schema_1.ArraySchema(e, e, e, e, e, e, e, e, e);
    }
    setHost(p) {
        this.host = p;
    }
    init() {
        this.game_state = 1;
        this.start = false;
    }
}
__decorate([
    schema_1.type({ map: player_1.Player })
], TicTacToeRoomState.prototype, "players", void 0);
__decorate([
    schema_1.type(player_1.Player)
], TicTacToeRoomState.prototype, "host", void 0);
__decorate([
    schema_1.type(['number'])
], TicTacToeRoomState.prototype, "board", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "activePlayer", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "game_state", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "game_price", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "max_player", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "win_price", void 0);
__decorate([
    schema_1.type("string")
], TicTacToeRoomState.prototype, "turn", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "nturn", void 0);
__decorate([
    schema_1.type("number")
], TicTacToeRoomState.prototype, "com", void 0);
__decorate([
    schema_1.type("boolean")
], TicTacToeRoomState.prototype, "start", void 0);
exports.default = TicTacToeRoomState;
