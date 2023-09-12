import { NgModule , CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PicPhotoPageRoutingModule } from './pic-photo-routing.module';

import { PicPhotoPage } from './pic-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PicPhotoPageRoutingModule
  ],
  declarations: [PicPhotoPage],
  schemas : [CUSTOM_ELEMENTS_SCHEMA]
})
export class PicPhotoPageModule {}
