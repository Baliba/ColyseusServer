"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const zoe_1 = require("./zoe");
const schema_1 = require("@colyseus/schema");
class Player extends schema_1.Schema {
    constructor(u, data, client, index) {
        super();
        this.hand = [];
        this.identity = u;
        this.turn = false;
        this.is_in_game = false;
        this.un = data.name;
        this.client = client;
        this.sessionId = client.sessionId;
        this.index = index;
    }
    myTurn() {
        this.turn = true;
    }
    notMyTurn() {
        this.turn = false;
    }
    inGame() {
        this.is_in_game = true;
    }
    notInGame() {
        this.is_in_game = false;
    }
    setHand(o) {
        this.hand = o;
    }
}
__decorate([
    schema_1.type("string")
], Player.prototype, "un", void 0);
__decorate([
    schema_1.type("string")
], Player.prototype, "sessionId", void 0);
__decorate([
    schema_1.type([zoe_1.Zoe])
], Player.prototype, "hand", void 0);
__decorate([
    schema_1.type("boolean")
], Player.prototype, "is_in_game", void 0);
__decorate([
    schema_1.type("boolean")
], Player.prototype, "turn", void 0);
exports.Player = Player;
