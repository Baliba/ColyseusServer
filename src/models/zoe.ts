import { Schema, type } from '@colyseus/schema';
import { Position } from './Position';

export class Zoe extends Schema {
    @type("number")
    A: number;
  
    @type("number")
    B: number;
  
    @type("boolean")
    is_double: boolean;
  
    @type("string")
    name: string;
  
    @type("boolean")
    firstZoe = false;
  
    @type(Zoe)
    up: Zoe;
  
    @type(Zoe)
    down: Zoe;
  
    @type(Zoe)
    right: Zoe;
  
    @type(Zoe)
    left: Zoe;
  
    @type(Position)
    position: Position;
    @type("number")
    public  angle: number;
    @type("number")
    public  scale: number;
  
  public constructor(a: number,b: number, id:boolean , n: string) {
    super();
    this.A = a
    this.B = b
    this.is_double = id;
    this.name = n;
    this.firstZoe = false;
  }

  public setAngle(a:number){
    this.angle = a;
  }

  public setScale(a:number){
    this.scale= a;
  }

  public setPosition(p: Position): void { 
    this.position = p;
  }

  public setFirst(fz: boolean) {
    this.firstZoe = fz;
  } 
  
  public isFirst() : boolean {
        return this.firstZoe;
  }
  
  getA(): number { 
    return this.A;
  }
  getB(): number { 
    return this.B;
  }
  setA(a: number) {
    this.A = a;
  }

  setB(a: number) {
    this.B = a;
  }

  getName(): string {
   return  this.name;
  }

  getZoeUp() : Zoe { 
    return this.up;
  }

  getZoeDown() : Zoe { 
    return this.down;
  }

  getZoeLeft() : Zoe { 
    return this.left;
  }

  getZoeRight() : Zoe { 
    return  this.right;
  }

  addZoeV1(zoe: Zoe) {
     if (this.A == zoe.getA() || this.A == zoe.getB() ) { 
         this.setZoeUp(zoe);
     } else if (this.B == zoe.getA() ||this.B == zoe.getB()) { 
         this.setZoeDown(zoe); 
    }
  }

  setZoeUp(zoe: Zoe) {
    zoe.setZoeDown(this);
    this.up = zoe;
  }

  setZoeDown(zoe: Zoe) {
    zoe.setZoeUp(this);
    this.down = zoe;
  }

  setZoeLeft(zoe: Zoe) {
    zoe.setZoeUp(this);
    this.left = zoe;
  }
  setZoeRight(zoe: Zoe) {
    zoe.setZoeDown(this);
    this.right = zoe;
  }
 
}