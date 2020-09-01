import {Component, OnInit} from '@angular/core';
import {Storage} from "@ionic/storage";

@Component({
    selector: 'app-highscore',
    templateUrl: './highscore.page.html',
    styleUrls: ['./highscore.page.scss'],
})
export class HighscorePage implements OnInit {
    highscore: number;
    photo: string;

    constructor(
        private storage: Storage,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter() {
        this.storage.get('highscore')
            .then((highscore: number) => {
                this.highscore = highscore
            })
        this.storage.get('photo')
            .then((photo: string) => {
                this.photo = photo
            })
    }
}
