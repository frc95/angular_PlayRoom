import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-button-tateti',
  templateUrl: './button-tateti.component.html',
  styleUrls: ['./button-tateti.component.css']
})
export class ButtonTatetiComponent implements OnInit {

  imgX : string = './assets/images/tateti/x.png'
  imgO : string = './assets/images/tateti/circulo.png'

  @Input() id!: number;
  @Input() ocupado!: boolean;
  @Input() botOcupado!: boolean;
  @Output() newOcupado = new EventEmitter<number>();

  @Input() pointerEvent!: string;

  constructor() { }

  ngOnInit(): void {
  }

  select(){
    this.newOcupado.emit(this.id)
  }

}
