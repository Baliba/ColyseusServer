import { Schema, type } from '@colyseus/schema';
export class Position extends Schema { 
  @type("number")
  x: Number;
  @type("number")
  y: Number;
  @type("number")
  z:Number;
  constructor(x: number, y: number, z: number) { 
    super();
    this.x = x;
    this.y = y;
    this.z = z;
  }
}


