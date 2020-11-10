import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tut2PageRoutingModule } from './tut2-routing.module';

import { Tut2Page } from './tut2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tut2PageRoutingModule
  ],
  declarations: [Tut2Page]
})
export class Tut2PageModule {}
