import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PicPhotoPage } from './pic-photo.page';

const routes: Routes = [
  {
    path: '',
    component: PicPhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PicPhotoPageRoutingModule {}
