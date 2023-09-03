import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoublephotosPageRoutingModule } from './doublephotos-routing.module';

import { DoublephotosPage } from './doublephotos.page';
import { PicPhotoPage } from '../pic-photo/pic-photo.page'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    // DoublephotosPageRoutingModule
  ],
  declarations: [DoublephotosPage]
})
export class DoublephotosPageModule {}
