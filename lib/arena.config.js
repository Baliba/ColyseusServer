"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const arena_1 = __importDefault(require("@colyseus/arena"));
const monitor_1 = require("@colyseus/monitor");
const deck_1 = require("./models/deck");
const Domino = __importStar(require("./rooms/DominoRoom"));
const TicTacToeRoom_1 = require("./rooms/TicTacToeRoom");
exports.default = arena_1.default({
    getId: () => "Haiti Domino",
    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer.define('dominoe', Domino.DominoRoom);
        gameServer.define('tic-tac-toe', TicTacToeRoom_1.TicTacToeRoom);
    },
    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            let d = new deck_1.Deck('default');
            let zoes = d.getZoes();
            let m = d.showListZoe(zoes);
            let game = d.shareZoe(zoes);
            let h = "[ <br/>";
            for (let i = 0; i <= game.hands.length; i++) {
                if (game.hands[i] != undefined && game.hands[i] != null) {
                    h += " PLAYER " + (i + 1) + "{ ";
                    for (let j = 0; j <= game.hands[i].length; j++) {
                        let z = game.hands[i][j];
                        if (z != undefined && z != null) {
                            h += " (" + z.getA() + " | " + z.getB() + "),";
                        }
                    }
                    h += "}<br/>";
                }
            }
            h += "]";
            let web = " List Zoes (" + zoes.length + "):" + m + "<br/>";
            res.send(web + h);
        });
        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/admin", monitor_1.monitor());
    },
    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});
