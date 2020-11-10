import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tut2Page } from './tut2.page';

const routes: Routes = [
  {
    path: '',
    component: Tut2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tut2PageRoutingModule {}
