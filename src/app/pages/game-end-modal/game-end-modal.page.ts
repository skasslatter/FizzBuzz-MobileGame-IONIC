import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {Router} from '@angular/router';

@Component({
    selector: 'app-modal',
    templateUrl: './game-end-modal.page.html',
    styleUrls: ['./game-end-modal.page.scss'],
})

export class GameEndModalPage implements OnInit {
    userPhoto: string;

    options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    };
    score: number;
    highscore: number = null;
    isNewHighScore = false;

    constructor(
        private modalCtrl: ModalController,
        private storage: Storage,
        private camera: Camera,
        private router: Router,
    ) {
    }

    ngOnInit() {
        // this.storage.clear();
        this.storage.get('scoreHistory')
            .then((value) => {
                    if (!value) {
                        this.isNewHighScore = true;
                        this.highscore = this.score;
                        this.storage.set('scoreHistory', JSON.stringify([{
                            score: this.score
                        }]));
                    } else {
                        const history = JSON.parse(value);
                        const latestHighScore = history[0].score;
                        if (this.score > latestHighScore) {
                            this.isNewHighScore = true;
                            this.highscore = this.score;
                            this.storage.set('scoreHistory', JSON.stringify([
                                {score: this.score},
                                ...history
                            ]));
                        } else {
                            this.isNewHighScore = false;
                            this.highscore = latestHighScore;
                        }
                    }
                },
                (err) => {
                    console.log(err);
                });
    }

    captureImage() {
        this.camera.getPicture(this.options)
            .then((imageData) => {
                this.userPhoto = 'data:image/jpeg;base64,' + imageData;
                this.storage.get('scoreHistory')
                    .then(value => {
                        const history = JSON.parse(value);
                        history[0].photo = this.userPhoto;
                        this.storage.set('scoreHistory', JSON.stringify(history))
                            .then(r => {
                                this.router.navigate(['/highscores']);
                                this.dismissModal();
                            });
                    });
            }, (err) => {
                console.log(err);
            });
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }
}
