import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-memo',
  templateUrl: './card-memo.component.html',
  styleUrls: ['./card-memo.component.css']
})
export class CardMemoComponent implements OnInit {

  @Input() img!: string;
  @Input() matched!: boolean;
  @Input() id!: number;
  @Input() pointerEvent!: string;
  @Output() setMatched = new EventEmitter<number>();

  cover : string = './assets/images/memotest/cover.jpg'

  constructor() { }

  ngOnInit(): void {
  }

  select(){
    this.setMatched.emit(this.id)
  }

}
