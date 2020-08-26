import { Component, OnInit } from '@angular/core';
import {fromEvent, Observable} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.page.html',
  styleUrls: ['./game.page.scss'],
})
export class GamePage implements OnInit {
  private nrInput$: Observable<Event>;
  private fizzInput$: Observable<Event>;
  private buzzInput$: Observable<Event>;
  private fizzBuzzInput$: Observable<Event>;

  constructor() { }

  ngOnInit() {
    this.nrInput$ = fromEvent(document.getElementById('nr-btn'), 'click');
    this.fizzInput$ = fromEvent(document.getElementById('fizz-btn'), 'click');
    this.buzzInput$ = fromEvent(document.getElementById('buzz-btn'), 'click');
    this.fizzBuzzInput$ = fromEvent(document.getElementById('fizzBuzz-btn'), 'click');
  }

}
