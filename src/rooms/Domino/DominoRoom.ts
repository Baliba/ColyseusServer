import { Room, Client } from "colyseus";
import { Player } from "../../models/player";
import { User } from "../../models/user";
import { DominoRoomState } from "./schema/DominoRoomState";
import { Zoe } from '../../models/zoe';

export class DominoRoom extends Room<DominoRoomState> {
  max_clients=2;
  onCreate(options: any) {
    this.setState(new DominoRoomState(this, 0, this.max_clients, 0.20));
    this.maxClients = this.max_clients;
    this.onMessage("type", (client, message) => {
     // broadcast a message to all clients
     // this.broadcast("action-taken", "an action has been taken!");

      // sends "fire" event to every client, except the one who triggered it.
      // this.broadcast("fire", message, { except: client });
    });
    this.setMetadata({ friendlyFire: true });
    console.log("room", this.roomId, "creating...");
  }

  onJoin(client: Client, options: any) {
    if (this.state.players.size < this.state.max_player) {
        let p = new Player(new User(), options, client, this.state.players.size);
        this.state.players.set(client.sessionId, p);
        if (this.state.players.size == 1) {
            this.state.setHost(p);
        }
      
       if (this.state.players.size == 2 && this.state.game_state === 0) {
          this.state.init();
          console.log("Other player add in ", this.roomId);
       }

       if (this.state.players.size == this.state.max_player) { 
         this.lock();
         console.log(" room lock ", this.roomId);
       }

    }
    else { 
      console.log("nom_place", "joined!", options);
    }

  }

  sendHandToClients(client:Client, zoes: Zoe[], i: number) { 
     client.send('add_zoe', { zoe: zoes, index: i});
  }

  onLeave (client: Client, consented: boolean) {
   //  console.log(client.sessionId, "left!");
    this.state.players.delete(client.sessionId);
    if(this.state.players.size == 1 && this.state.start) {
      this.state.game_state = 8;
    }
  }

  onDispose() {
     console.log("room", this.roomId, "disposing...");
  }

}
