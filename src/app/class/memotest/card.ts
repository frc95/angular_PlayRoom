export class Card {
    id : number;
    image : string;
    matched : boolean;
    pointerEvent : string;

    constructor(id:number, image:string, matched: boolean, pointerEvent:string){
        this.id = id
        this.image = image;
        this.matched = matched;
        this.pointerEvent = pointerEvent;
    }
}
