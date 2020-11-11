import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tut3PageRoutingModule } from './tut3-routing.module';

import { Tut3Page } from './tut3.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tut3PageRoutingModule
  ],
  declarations: [Tut3Page]
})
export class Tut3PageModule {}
