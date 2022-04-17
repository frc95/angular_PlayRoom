import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PPTComponent implements OnInit {

  imgPiedra : String = './assets/images/ppt/piedra.png';
  imgPapel : String = './assets/images/ppt/papel.png';
  imgTijera : String = './assets/images/ppt/tijera.png';

  puntosJugador : number = 0
  puntosMaquina : number = 0

  resultadoText : string = 'Elija una opción'; 
  resultado : boolean = false;

  imgJugador : String = '';
  imgMaquina : String = '';

  

  constructor() { }

  ngOnInit(): void {
  }

  //Piedra = 0
  //Papel = 1
  //Tijera = 2
   
  opcion(opcion:number){
    this.resultado = true
    let numero=Math.floor(Math.random() * 3);
    switch(numero){
      case 0:
        this.imgMaquina = this.imgPiedra;
        this.maquinaPiedra(opcion)
        break;
      case 1:
        this.imgMaquina = this.imgPapel;
        this.maquinaPapel(opcion)
        break;
      case 2:
        this.imgMaquina = this.imgTijera;
        this.maquinaTijera(opcion)
        break;
    }
  }

  maquinaPiedra(opcion:number){
    switch(opcion){
      case 0:
        this.resultadoText = 'Empate';
        this.imgJugador = this.imgPiedra;
        break;
      case 1:
        this.resultadoText = 'Ganaste'
        this.puntosJugador = this.puntosJugador + 1;
        this.imgJugador = this.imgPapel;
        break;
      case 2:
        this.resultadoText = 'Perdiste'
        this.puntosMaquina = this.puntosMaquina + 1;
        this.imgJugador = this.imgTijera;
        break;
    }
  }

  maquinaPapel(opcion:number){
    switch(opcion){
      case 0:
        this.resultadoText = 'Perdiste'
        this.puntosMaquina = this.puntosMaquina + 1;
        this.imgJugador = this.imgPiedra; 
        break;
      case 1:
        this.resultadoText = 'Empate'
        this.imgJugador = this.imgPapel;
        break;
      case 2:
        this.resultadoText = 'Ganaste'
        this.puntosJugador = this.puntosJugador + 1;
        this.imgJugador = this.imgTijera; 
        break;
    }
  }

  maquinaTijera(opcion:number){
    switch(opcion){
      case 0:
        this.resultadoText = 'Ganaste'
        this.puntosJugador = this.puntosJugador + 1;
        this.imgJugador = this.imgPiedra;  
        break;
      case 1:
        this.resultadoText = 'Perdiste'
        this.puntosMaquina = this.puntosMaquina + 1;
        this.imgJugador = this.imgPapel; 
        break;
      case 2:
        this.resultadoText = 'Empate'
        this.imgJugador = this.imgTijera;
        break;
    }
  }

  reiniciar(){
    this.resultado = false
  }

  

}

