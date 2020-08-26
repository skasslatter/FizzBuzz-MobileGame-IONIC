import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HighscorePageRoutingModule } from './highscore-routing.module';

import { HighscorePage } from './highscore.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HighscorePageRoutingModule
  ],
  declarations: [HighscorePage]
})
export class HighscorePageModule {}
