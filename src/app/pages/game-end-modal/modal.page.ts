import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {
    score: number;
    highscore: number = null;
    isNewHighScore: boolean = false;

    constructor(
        private modalCtrl: ModalController,
        private storage: Storage
    ) {
    }

    ngOnInit() {
        // this.storage.clear();

        this.storage.get('highscore')
            .then(value => {
                if (value === null || this.score > value) {
                    this.storage.set('highscore', this.score)
                    this.highscore = this.score
                    this.isNewHighScore = true
                } else {
                    this.highscore = value
                    this.isNewHighScore = false
                }
            })
    }

    dismiss() {
        this.modalCtrl.dismiss();
    }
}
