import { Component, OnInit } from '@angular/core';
import { Button } from 'src/app/class/teteti/button';
import { JuegosService } from 'src/app/services/juegos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-tateti',
  templateUrl: './tateti.component.html',
  styleUrls: ['./tateti.component.css']
})
export class TatetiComponent implements OnInit {

  /*mapa*/
  buttons : Button[] = [
    {id:0, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:1, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:2, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:3, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:4, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:5, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:6, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:7, ocupado: false, botOcupado: false, pointerEvent: ''},
    {id:8, ocupado: false, botOcupado: false, pointerEvent: ''},
  ]

  espacios : number = 9
  textinfo : string = 'Elija una opción'

  /*victorias*/
  victorias : number [][] = [
    /*horizontales*/
    [0,1,2],
    [3,4,5],
    [6,7,8],
    /*verticales*/
    [0,3,6],
    [1,4,7],
    [2,5,8],
    /*diagonales*/
    [0,4,8],
    [6,4,2],
  ]

  disabled : boolean = true
  puntos : number = 0

  display="0:0";
  interval : any;
  time : number = 30;

  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.empezarTemporizador()
  }

  maquina(idOcupado : number){

    this.buttons[idOcupado].ocupado = true
    this.buttons[idOcupado].pointerEvent = 'none'
    this.espacios = this.espacios - 1

    let roundWon = this.validarVictoria('Ganaste')

    if ( !roundWon && this.espacios != 0 ){
      let numero=Math.floor(Math.random() * 9);
      while(this.buttons[numero].ocupado == true)
      {
        numero=Math.floor(Math.random() * 9);
      }
      this.buttons[numero].ocupado = true
      this.buttons[numero].botOcupado = true
      this.buttons[numero].pointerEvent = 'none'
      this.espacios = this.espacios - 1
      roundWon = this.validarVictoria('Perdiste')
    }

    if( !roundWon && this.espacios == 0){
      this.textinfo = 'Empate'
      this.puntos++
    }

    
  }


  validarVictoria(text : string){
    let roundWon = false
    for (let i = 0; i < this.victorias.length; i++) {
      let winCondition = this.victorias[i]

      let position1 = this.buttons[winCondition[0]]
      let position2 = this.buttons[winCondition[1]]
      let position3 = this.buttons[winCondition[2]]
      
      if (position1.ocupado == false && position1.botOcupado == false || 
          position2.ocupado == false && position2.botOcupado == false || 
          position3.ocupado == false && position3.botOcupado == false) {
          
        continue; 
      }
      if (position1.ocupado == position2.ocupado && 
          position2.ocupado == position3.ocupado &&
          position1.botOcupado == position2.botOcupado && 
          position2.botOcupado == position3.botOcupado ) {

        roundWon = true 
        break
      }
    }

    if (roundWon) {
      if(text == 'Ganaste'){
        this.puntos += 3
      }
      this.textinfo = text
      this.stopGame()
    }

    return roundWon
  }

  stopGame(){
    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].pointerEvent = 'none'
    }
  }

  reiniciar(){
    this.textinfo = 'Elija una opción'
    this.espacios = 9

    for (let i = 0; i < this.buttons.length; i++) {
      this.buttons[i].ocupado = false
      this.buttons[i].botOcupado = false
      this.buttons[i].pointerEvent = ''
    }

    if(this.time == 0){
      this.disabled = true
      this.pausar();
      this.puntos = 0;
      this.time = 30;
      this.empezarTemporizador();
    }
  }

  empezarTemporizador(){
    this.interval = setInterval(() => {
      if(this.time === 30){
        this.time--;
      }
      else{
        this.time--;
      }
      this.timeOut();
      this.display = this.transform(this.time);
    }, 1000);
  }

  transform(value: number):string{
    const minutes : number = Math.floor(value/60);
    return minutes + ':' + (value - minutes * 60);
  }

  pausar(){
    clearInterval(this.interval);
  }

  timeOut()
  {
    if(this.time==0)
    {
      this.stopGame();
      this.pausar();
      this.disabled = false
      this.textinfo="Se acabo el tiempo!! Puede guardar los resultados";
    }
  }

  async guardar(){
    await Swal.fire({
      title: 'Ingrese su nombre',
      input: 'text',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      inputAttributes: {
        maxlength: '10'
      },
      inputValidator: (value) => {
        return new Promise((resolve) => {
          if (!value || value.length < 3) {
            resolve('Error. Ingrese un nombre de 3 caracteres o mas');
          }else{
            this.juegosService.addResultadoTateti(value, this.puntos)
            this.disabled = true
            resolve('')
          }
        });
      }

    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        Swal.fire('Resultado guardados', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Los resultados no fueron guardados', '', 'info')
      }
    })

  }

  

}
