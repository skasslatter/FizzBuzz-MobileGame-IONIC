import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ModalPageRoutingModule } from './game-end-modal-routing.module';
import { GameEndModalPage } from './game-end-modal.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ModalPageRoutingModule
  ],
  declarations: [GameEndModalPage]
})
export class ModalPageModule {
}


