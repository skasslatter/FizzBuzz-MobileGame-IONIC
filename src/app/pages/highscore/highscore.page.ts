import {Component, OnInit} from '@angular/core';
import {Storage} from '@ionic/storage';

interface Highscore {
    name: string;
    score: number;
    photo: string;
}

@Component({
    selector: 'app-highscore',
    templateUrl: './highscore.page.html',
    styleUrls: ['./highscore.page.scss'],
})
export class HighscorePage implements OnInit {
    highscoreHistory: Highscore[];

    constructor(
        private storage: Storage,
    ) {
    }

    ngOnInit() {
    }

    ionViewWillEnter(): void {
        this.storage.get('scoreHistory')
            .then((value) => {
                this.highscoreHistory = JSON.parse(value);
                console.log('highscoreHistory', this.highscoreHistory);
                console.log('highscoreHistory[0]', this.highscoreHistory[0]);
            });
    }
}
