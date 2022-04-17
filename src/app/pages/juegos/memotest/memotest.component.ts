import { Component, OnInit } from '@angular/core';
import { Card } from 'src/app/class/memotest/card';
import { JuegosService } from 'src/app/services/juegos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-memotest',
  templateUrl: './memotest.component.html',
  styleUrls: ['./memotest.component.css']
})
export class MemotestComponent implements OnInit {

  cards : Card[] = [
    { id:1, image: "./assets/images/memotest/arco-y-flecha.png", matched: false, pointerEvent: ''},
    { id:2, image: "./assets/images/memotest/arco-y-flecha.png", matched: false, pointerEvent: ''},
    { id:3, image: "./assets/images/memotest/caballero.png", matched: false, pointerEvent: '' },
    { id:4, image: "./assets/images/memotest/caballero.png", matched: false, pointerEvent: '' },
    { id:5, image: "./assets/images/memotest/espadas.png", matched: false, pointerEvent: '' },
    { id:6, image: "./assets/images/memotest/espadas.png", matched: false, pointerEvent: '' },
    { id:7, image: "./assets/images/memotest/gladiador.png", matched: false, pointerEvent: '' },
    { id:8, image: "./assets/images/memotest/gladiador.png", matched: false, pointerEvent: '' },
    { id:9, image: "./assets/images/memotest/libro-de-hechizos.png", matched: false, pointerEvent: '' },
    { id:10, image: "./assets/images/memotest/libro-de-hechizos.png", matched: false, pointerEvent: '' },
    { id:11, image: "./assets/images/memotest/reloj-de-arena.png", matched: false, pointerEvent: '' },
    { id:12, image: "./assets/images/memotest/reloj-de-arena.png", matched: false, pointerEvent: '' },
  ]

  choiceOne : string = '';
  choiceTwo : string = '';
  idChoiceOne : number = 0;

  textinfo : string = 'Elija 2 cartas'

  display="0:0";
  interval : any;
  time : number = 0;

  disabled : boolean = true


  constructor(private juegosService : JuegosService) { }

  ngOnInit(): void {
    this.cards=this.shuffle();
    this.empezarTemporizador();
  }

  shuffle(){
    let currentIndex = this.cards.length;
    let temporaryValue;
    let randomIndex;

    while (currentIndex !== 0){
      randomIndex = Math.floor(Math.random()*currentIndex);
      currentIndex -= 1;

      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
    
    return this.cards;
  }

  selectCard(id:number){
    
   this.cards.filter(card => card.id == id)
   .map(card => (card.matched = true , card.pointerEvent='none'))

   if(this.choiceOne == ''){
      const cardOne = this.cards.find(card => card.id == id);
      this.choiceOne = cardOne?.image as string
      this.idChoiceOne = id
   }
   else{

        const cardTwo = this.cards.find(card => card.id == id);
        this.choiceTwo = cardTwo?.image as string

        if(this.choiceOne != this.choiceTwo){
          this.textinfo = 'Espere 3 segundos'
          this.cards.map(card => card.pointerEvent='none')

          setTimeout(() => {
            this.cards.filter(card => card.id == this.idChoiceOne)
            .map(card => card.matched = false)

            this.cards.filter(card => card.id == id)
            .map(card => card.matched = false)

            this.choiceOne = ''
            this.choiceTwo = ''
            this.idChoiceOne = 0

            this.cards.filter(card => card.matched == false)
            .map(card => card.pointerEvent='')

            this.textinfo = 'Elija 2 cartas'

          }, 3000);
        }else{
          this.choiceOne = ''
          this.choiceTwo = ''
          this.idChoiceOne = 0

          let endGame = this.cards.every(card => card.matched);
          if(endGame){
            this.textinfo = 'Juego terminado puede guardar los resultados'
            this.pausar()
            this.disabled = false
          }
        }
      
      }

   
  }



  reiniciar(){
    this.cards.map(card => (card.pointerEvent='', card.matched=false))
    this.choiceOne = ''
    this.choiceTwo = ''
    this.idChoiceOne = 0
    this.textinfo = 'Elija 2 cartas'

    this.disabled = true

    this.cards=this.shuffle()

    this.pausar()
    this.display="0:0"
    this.time = 0;
    this.empezarTemporizador()
  }

  transform(value: number):string{
    const minutes : number = Math.floor(value/60);
    return minutes + ':' + (value - minutes * 60);
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

  pausar(){
    clearInterval(this.interval);
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
            this.juegosService.addResultadoMemotest(value, this.time)
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
