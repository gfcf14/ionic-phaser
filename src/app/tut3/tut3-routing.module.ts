import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tut3Page } from './tut3.page';

const routes: Routes = [
  {
    path: '',
    component: Tut3Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tut3PageRoutingModule {}
