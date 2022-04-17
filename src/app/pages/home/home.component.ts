import { Component, OnInit } from '@angular/core';
import { Juego } from 'src/app/class/juego';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  juegos : Juego[] = [
    {titulo: 'Piedra Papel o Tijeras', descripcion:'Hola',url:'ppt' , imgUrl:'./assets/images/piedraPapelTijeras.png'},
    {titulo: 'TaTeTi', descripcion:'Hola',url:'tateti' , imgUrl:'./assets/images/tateti.png'},
    {titulo: 'Memotest', descripcion:'Hola',url:'memotest' , imgUrl:'./assets/images/memotest.png'},
    {titulo: 'BlueBall', descripcion:'Hola',url:'blueball' , imgUrl:'./assets/images/pelotaFondo.png'},
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
