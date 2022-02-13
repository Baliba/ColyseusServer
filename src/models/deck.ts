import { Zoe } from "./zoe";
export class Deck { 
  
  zoes: Zoe[] = [];
  bg: String;

  constructor(bg:string) { 
    this.bg = bg;
    this.createDeck();
  }

  createDeck() {
    let k = 0;
    for (let i = 0; i <= 6; i++) { 
      for (let j = 0; j <= 6; j++) { 
        if (!this.isExist(i, j)) {
            let id = (i == j) ? true : false;
            this.zoes.push(new Zoe(i, j, id, this.getZoeName(i, j)));
            k++;
            continue;
        }
      }
    }
    this.arrangeZoe();
  }
  public getZoeName(i: number, j: number): string {
    return "ZOE_" + i + "_" + j;
  }

  arrangeZoe() {
    let zs: Zoe[] = [];
    let k = 0;
    for (let i = 0; i <= this.zoes.length; i++) {
         let z: Zoe = this.zoes[i];
      if (z != undefined && z != null) {
          zs.push(z);
          k++;
      }
    }
    this.zoes = this.shuffle(zs);
  }

   shuffle(array:any) {
    var currentIndex = array.length, temporaryValue, randomIndex;
    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }

  shareZoe(zoes: Zoe[]) : any { 
    let gamersHands: any = [];
    let hand: Zoe[] = [];
    let hzoes: Zoe[] = zoes;
    for (let i = 0; i <= hzoes.length; i++) { 
         let z: Zoe = hzoes[i];
        // if (z != undefined && z != null) { 
           hand.push(z);
           delete zoes[i];
           if ((i+1) % 7 == 0) { 
              gamersHands.push(hand);
              hand  = [];
           }
        // }
    }
    return { "hands":gamersHands, "deck":zoes };
  }

  isExist(a: number, b: number): boolean { 

    if (this.zoes.length == 0) return false;

    for (let i = 0; i <= this.zoes.length; i++) { 
      let z: Zoe = this.zoes[i];
      if (z!=undefined && z!= null) {
        if ((z.getA() == a && z.getB() == b) ||
            (z.getA() == b && z.getB() == b)) {
          return true;
        }
      }
    }
    return false;
  }

  public getZoes() : Zoe[] { 
    return this.zoes;
  }

  showListZoe(zoes: any) { 
    let m = "";
    for (let i = 0; i <= zoes.length; i++) { 
        let z  = zoes[i];
        if (z != undefined && z != null) {
            m += "<br/> "+z.getName()+" => [" + z.getA()+" | "+z.getB()+"]";
        }
    }
    return m;
  }
}