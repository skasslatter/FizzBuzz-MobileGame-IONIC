import {Component, OnInit} from '@angular/core';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';

@Component({
    selector: 'app-highscore',
    templateUrl: './highscore.page.html',
    styleUrls: ['./highscore.page.scss'],
})
export class HighscorePage implements OnInit {
    clickedImage: string;
    options: CameraOptions = {
        quality: 30,
        destinationType: this.camera.DestinationType.DATA_URL,
        encodingType: this.camera.EncodingType.JPEG,
        mediaType: this.camera.MediaType.PICTURE
    }

    constructor(
        private camera: Camera,
    ) {
    }

    ngOnInit() {
    }

    captureImage() {
        this.camera.getPicture(this.options).then((imageData) => {
            this.clickedImage = 'data:image/jpeg;base64,' + imageData;
        }, (err) => {
            console.log(err);
        });
    }
}
