import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tut1PageRoutingModule } from './tut1-routing.module';

import { Tut1Page } from './tut1.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tut1PageRoutingModule
  ],
  declarations: [Tut1Page]
})
export class Tut1PageModule {}
