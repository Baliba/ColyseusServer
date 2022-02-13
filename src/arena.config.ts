import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import { Deck } from "./models/deck";
import { Zoe } from "./models/zoe";
import { DominoRoom } from "./rooms/Domino/DominoRoom";
import { TicTacToeRoom } from "./rooms/Titactoe/TicTacToeRoom";
export default Arena({
    getId: () => "Haiti Domino",

    initializeGameServer: (gameServer) => {
        gameServer.define('dominoe', DominoRoom);
        gameServer.define('tic-tac-toe', TicTacToeRoom);
    },

    initializeExpress: (app) => {
        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {

            let d = new Deck('default');
            let zoes = d.getZoes();

            let m = d.showListZoe(zoes);

            let game = d.shareZoe(zoes);
    
            let h = "[ <br/>";
            for (let i = 0; i <= game.hands.length; i++) { 
                if (game.hands[i] != undefined && game.hands[i] != null) {
                    h += " PLAYER " + (i + 1) + "{ ";
                    for (let j = 0; j <= game.hands[i].length; j++) {
                        let z: Zoe = game.hands[i][j];
                        if (z != undefined && z != null) {
                            h += " (" + z.getA() + " | " + z.getB() + "),";
                        }
                    }
                    h += "}<br/>";
                }
            }
            h += "]";
            let web = " List Zoes (" +zoes.length+"):"+m+"<br/>" 
            res.send(web+h);

        });

        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/admin", monitor());
    },


    beforeListen: () => {
        /**
         * Before before gameServer.listen() is called.
         */
    }
});