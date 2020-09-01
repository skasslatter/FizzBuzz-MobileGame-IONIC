import {Component, OnInit} from '@angular/core';
import {ModalController} from '@ionic/angular';
import {Storage} from '@ionic/storage';
import {Camera, CameraOptions} from "@ionic-native/camera/ngx";
import {Router} from "@angular/router";

@Component({
    selector: 'app-modal',
    templateUrl: './modal.page.html',
    styleUrls: ['./modal.page.scss'],
})

export class ModalPage implements OnInit {
    userPhoto: string;
    highscoreHolderPhoto: string;

    options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }
    score: number;
    highscores: number = null;
    isNewHighScore: boolean = false;

    constructor(
        private modalCtrl: ModalController,
        private storage: Storage,
        private camera: Camera,
        private router: Router,
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

        // this.storage.get('highscores')
        //     .then((scores) => {
        //         const allScores = JSON.parse(scores)
        //         if (allScores === null) {
        //             this.storage.set('highscores', JSON.stringify([{score: this.score}]))
        //                 .then((r) => {
        //                     this.highscores = this.score
        //                     this.isNewHighScore = true
        //                 })
        //         } else if (this.score > allScores[0].score) {
        //
        //         } else {
        //             this.highscores = allScores[0].score
        //             this.isNewHighScore = false
        //         }
        //     }, (err) => {
        //         console.log(err);
        //     })

        this.storage.get('highscore')
            .then((value) => {
                    if (value === null || this.score > value) {
                        this.storage.set('highscore', this.score)
                            .then((r) => {
                                this.highscores = this.score
                                this.isNewHighScore = true
                            })
                    } else {
                        this.highscores = value
                        this.isNewHighScore = false
                    }
                },
                (err) => {
                    console.log(err);
                })
    }

    captureImage() {
        this.camera.getPicture(this.options)
            .then((imageData) => {
                this.userPhoto = 'data:image/jpeg;base64,' + imageData;
                // this.storage.set('highscores', JSON.stringify([{photo: this.userPhoto}]))
                this.storage.set('photo', this.userPhoto)
                    .then((r) => {
                        this.highscoreHolderPhoto = this.userPhoto
                        this.router.navigate(['/highscores']);
                    })
            }, (err) => {
                console.log(err);
            });
    }

    dismissModal() {
        this.modalCtrl.dismiss();
    }
}
