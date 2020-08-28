import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.page.html',
  styleUrls: ['./modal.page.scss'],
})
export class ModalPage implements OnInit {
  score: number;
  highscore: number = 0;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    console.log("score", this.score);
  }

  isNewHighScore(): boolean {
    return this.score > this.highscore;
  }

  dismiss() {
    this.modalCtrl.dismiss();
  }
}
