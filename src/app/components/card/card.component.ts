import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { JuegosService } from 'src/app/services/juegos.service';


@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnDestroy {

  @Input() urlImage!: String;
  @Input() titulo!: String;
  @Input() descripcion!: String;
  @Input() ruta!: String;

  arrResultados : any;

  private suscripcion : Subscription;

  constructor(private juegosService : JuegosService) {
    this.suscripcion = Subscription.EMPTY
  }

  ngOnDestroy(): void {
    this.suscripcion.unsubscribe()
  }

  ngOnInit(): void {
    switch(this.titulo){
      case 'TaTeTi':
        this.suscripcion = this.juegosService.getResultadosTateti().subscribe(resultados =>{
          this.arrResultados = resultados
        })
        break;
      
      case 'Memotest':
        this.suscripcion = this.juegosService.getResultadosMemotest().subscribe(resultados =>{
          this.arrResultados = resultados
        })
        break;

      case 'BlueBall':
        this.suscripcion = this.juegosService.getResultadosBlueball().subscribe(resultados =>{
          this.arrResultados = resultados
      })
      break;
    }
  }
  

}
