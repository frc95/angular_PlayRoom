import { Component, OnInit } from '@angular/core';
import { JuegosService } from 'src/app/services/juegos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-blueball',
  templateUrl: './blueball.component.html',
  styleUrls: ['./blueball.component.css']
})
export class BlueballComponent implements OnInit {

  puntos : number = 0
  puntosParaGanar : number = 30
  mensaje : string = 'Pasa el mouse sobre la pelota azul. Cuidado con el enemigo'

  time = 0
  interval : any
  display = "0:0"

  mtop : number = 0
  mleft : number = 0

  animationState : string = 'running'
  pointerEvent : string = '';

  disabled : boolean = true

  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.empezarTemporizador();
  }

  reiniciar(){
    this.animationState = 'running'
    this.pointerEvent = ''
    this.disabled = true

    this.pausar();
    this.display = "0:0"
    this.puntos = 0;
    this.time = 0;
    this.mensaje = "Pasa el mouse sobre la pelota azul. Cuidado con el enemigo";
    this.empezarTemporizador();
  }

  sumarPuntos (){
    this.puntos++;

    let numeroAleatorio1 = Math.round(Math.random()*450); //top
    let numeroAleatorio2 = Math.round(Math.random()*550); //left
    this.mtop = numeroAleatorio1
    this.mleft = numeroAleatorio2

    if(this.puntos==this.puntosParaGanar)
    {
      this.mensaje="Ganaste!. Puedes guardar los resultados";
      this.pausar();
      this.pointerEvent = 'none'
      this.animationState = 'paused'
      this.disabled = false
    }

  }

  empezarTemporizador(){
    this.interval = setInterval(() => {
      if(this.time === 0){
        this.time++;
      }
      else{
        this.time++;
      }
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

  perdiste()
  {
    this.pausar();
    this.mensaje="Perdiste pasaste el mouse sobre el enemigo";
    this.pointerEvent = 'none'
    this.animationState = 'paused'
    
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
            this.juegosService.addResultadoBlueball(value, this.time)
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
