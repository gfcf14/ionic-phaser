import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tut1Page } from './tut1.page';

const routes: Routes = [
  {
    path: '',
    component: Tut1Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tut1PageRoutingModule {}
