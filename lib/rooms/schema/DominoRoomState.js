"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DominoRoomState = void 0;
const player_1 = require("../../models/player");
const schema_1 = require("@colyseus/schema");
const deck_1 = require("../../models/deck");
class DominoRoomState extends schema_1.Schema {
    constructor(room, price, max_player, com) {
        super();
        this.players = new schema_1.MapSchema();
        this.out_players = new schema_1.MapSchema();
        this.game_state = 0;
        this.game_price = 0;
        this.max_player = 0;
        this.canplay = false;
        this.max_way = 4;
        this.mode_game = 0;
        this.ZGround = [];
        this.zoe_pose_up = [];
        this.zoe_pose_down = [];
        this.zoe_pose_left = [];
        this.zoe_pose_right = [];
        this.dist = 0;
        this.room = room;
        this.game_price = price;
        this.max_player = max_player;
        this.com = com;
        this.dist = 0;
    }
    sendZoes() {
        this.room.clock.start();
        let i = 0;
        this.delayedInterval = this.room.clock.setInterval(() => {
            console.log("Time now " + i + " : " + this.room.clock.currentTime);
            let j = 0;
            this.players.forEach((element) => {
                if (j == i) {
                    this.players.get(element.client.sessionId).inGame();
                    this.addZoeToPlayer(element.client.sessionId, j);
                }
                j++;
            });
            if (i == this.players.size - 1) {
                this.delayedInterval.clear();
                this.startGame();
                console.log("Time now stop : " + this.room.clock.currentTime);
            }
            i++;
        }, 1000);
    }
    setHost(p) {
        this.host = p;
    }
    deletePlayer(sessionId) {
    }
    init() {
        this.game_state = 1;
        this.dist = 0;
        this.start = false;
        this.checkIsReady();
    }
    checkIsReady() {
        this.canplay = false;
        if (this.players.size > 1) {
            this.number_player = this.players.size;
            this.setWinPrice();
            this.loopOnPlayer(this.resetPlayerHand.bind(this), this.mixAndDistribute.bind(this));
        }
        else {
            this.game_state = 0;
        }
    }
    setWinPrice() {
        if (this.game_price > 0) {
            const tw = (this.number_player * this.game_price);
            const c = tw * this.com;
            this.win_price = tw - c;
        }
        else {
            this.win_price = 0;
        }
    }
    resetPlayerHand(i) {
        this.players.get(i).hand = [];
    }
    mixAndDistribute() {
        let d = new deck_1.Deck('default');
        this.hzoes = d.getZoes();
        this.game = d.shareZoe(this.hzoes);
        this.sendZoes();
        // this.loopOnPlayer(this.addZoeToPlayer.bind(this), this.startGame.bind(this));
    }
    addZoeToPlayer(id, dist) {
        const zoes = this.game.hands[dist];
        this.players.get(id).setHand(zoes);
        console.log("send to =>", this.players.get(id).client.sessionId);
        this.room.sendHandToClients(this.players.get(id).client, zoes, dist);
    }
    loopOnPlayer(callBack, next) {
        this.players.forEach((element) => {
            callBack(element.client.sessionId);
        });
        next();
    }
    startGame() {
        const index = this.random(this.players.size);
        this.firstZoe = true;
        let i = 0;
        this.players.forEach((element) => {
            if (i == index) {
                this.turn = element.client.sessionId;
                this.nturn = i;
                this.players.get(element.client.sessionId).myTurn();
            }
            else {
                this.players.get(element.client.sessionId).notMyTurn();
            }
            i++;
        });
        this.play();
    }
    nextTurn() {
        if ((this.nturn + 1) >= this.players.size) {
            this.nturn = 0;
        }
        else {
            this.nturn++;
        }
        this.setTurn();
    }
    setTurn() {
        let i = 0;
        this.players.forEach((element) => {
            if (i == this.nturn) {
                this.turn = element.client.sessionId;
                this.players.get(element.client.sessionId).myTurn();
            }
            else {
                this.players.get(element.client.sessionId).notMyTurn();
            }
            i++;
        });
        this.firstZoe = false;
        this.play();
    }
    play() {
        this.pose = this.getTotalZoePoseInit();
        this.players.get(this.turn).myTurn();
        this.canplay = true;
        if (this.pose == 0) {
            this.start = true;
            this.game_state = 10;
        }
        else {
            this.game_state = 20;
        }
    }
    gameOver() {
        this.start = false;
        this.canplay = false;
    }
    random(max) {
        return Math.floor(Math.random() * max);
    }
    addZoeV1(zoe, way = 0) {
        if (this.Ground == undefined) {
            zoe.setFirst(true);
            this.Ground = zoe;
            this.BoardFace = zoe;
            this.ZGround.push(zoe);
        }
        else {
            if (way == 1) {
                return this.goUp(this.Ground, zoe);
            }
            else {
                return this.goDown(this.Ground, zoe);
            }
        }
    }
    addZoeV2(zoe, way) {
        let pose = false;
        if (this.Ground == undefined) {
            zoe.setFirst(true);
            this.Ground = zoe;
            pose = true;
        }
        else {
        }
    }
    getTotalZoePoseInit() {
        return this.zoe_pose_up.length +
            this.zoe_pose_down.length +
            this.zoe_pose_left.length +
            this.zoe_pose_right.length;
    }
    getTotalZoePose() {
        return this.zoe_pose_up.length +
            this.zoe_pose_down.length +
            this.zoe_pose_left.length +
            this.zoe_pose_right.length + 1;
    }
    goUp(zoe, nz) {
        if (zoe.getA() == undefined) {
            if (nz.getA() == zoe.getA() || nz.getB() == zoe.getA()) {
                if (nz.getA() == this.BoardFace.getA()) {
                    this.BoardFace.setA(nz.getB());
                }
                else {
                    this.BoardFace.setA(nz.getA());
                }
                zoe.setZoeUp(nz);
                this.zoe_pose_up.push(nz);
                return true;
            }
            return false;
        }
        else {
            this.goUp(zoe, nz);
        }
        return false;
    }
    goDown(zoe, nz) {
        if (zoe.getB() == undefined) {
            if (nz.getA() == zoe.getB() || nz.getB() == zoe.getB()) {
                if (nz.getA() == this.BoardFace.getB()) {
                    this.BoardFace.setB(nz.getB());
                }
                else {
                    this.BoardFace.setB(nz.getA());
                }
                zoe.setZoeDown(nz);
                this.zoe_pose_down.push(nz);
                return true;
            }
            return false;
        }
        else {
            this.goUp(zoe, nz);
        }
        return false;
    }
    goLeft(zoe, nz) {
    }
    goRight(zoe, nz) {
    }
}
__decorate([
    schema_1.type({ map: player_1.Player })
], DominoRoomState.prototype, "players", void 0);
__decorate([
    schema_1.type({ map: player_1.Player })
], DominoRoomState.prototype, "out_players", void 0);
__decorate([
    schema_1.type(player_1.Player)
], DominoRoomState.prototype, "host", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "game_state", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "game_price", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "max_player", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "win_price", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "number_player", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "number_out_player", void 0);
__decorate([
    schema_1.type("string")
], DominoRoomState.prototype, "turn", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "nturn", void 0);
__decorate([
    schema_1.type("boolean")
], DominoRoomState.prototype, "start", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "pose", void 0);
__decorate([
    schema_1.type("boolean")
], DominoRoomState.prototype, "canplay", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "max_way", void 0);
__decorate([
    schema_1.type("number")
], DominoRoomState.prototype, "mode_game", void 0);
__decorate([
    schema_1.type("boolean")
], DominoRoomState.prototype, "firstZoe", void 0);
exports.DominoRoomState = DominoRoomState;
