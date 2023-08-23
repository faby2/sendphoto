import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DoublephotosPage } from './doublephotos.page';

const routes: Routes = [
  {
    path: '',
    component: DoublephotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DoublephotosPageRoutingModule {}
