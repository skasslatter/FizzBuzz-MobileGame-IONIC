import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {
    clickedPhoto: string;
    highscoreHolderPhoto: string;
    options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    score: number;
    highscore: number = null;
    isNewHighScore: boolean = false;

    constructor(
        private modalCtrl: ModalController,
        private storage: Storage,
        private camera: Camera,
    ) {
    }

    ngOnInit() {
        // this.storage.clear();
        this.storage.get('photo')
            .then((photo) => {
                this.highscoreHolderPhoto = photo
            }, (err) => {
                console.log(err);
            })

        this.storage.get('highscore')
            .then(value => {
                if (value === null || this.score > value) {
                    this.storage.set('highscore', this.score)
                        .then((r) => {
                            this.highscore = this.score
                            this.isNewHighScore = true
                        })
                } else {
                    this.highscore = value
                    this.isNewHighScore = false
                }
            }, (err) => {
                console.log(err);
            });
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }

    captureImage() {
        this.camera.getPicture(this.options)
            .then((imageData) => {
                this.clickedPhoto = 'data:image/jpeg;base64,' + imageData;
                this.storage.set('photo', this.clickedPhoto)
                    .then((r) => {
                        this.highscoreHolderPhoto = this.clickedPhoto
                    })
            }, (err) => {
                console.log(err);
            });
    }
}
