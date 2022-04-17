export class Button {
    id : number;
    ocupado : boolean;
    botOcupado : boolean;
    pointerEvent : string;

    constructor(id:number, ocupado: boolean, botOcupado : boolean, pointerEvent : string){
        this.id = id;
        this.ocupado = ocupado;
        this.botOcupado = botOcupado;
        this.pointerEvent = pointerEvent;
    }
}
