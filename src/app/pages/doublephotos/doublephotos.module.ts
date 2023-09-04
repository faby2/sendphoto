import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DoublephotosPageRoutingModule } from './doublephotos-routing.module';

import { DoublephotosPage } from './doublephotos.page';
import { TakePictureComponent } from 'src/app/component/take-picture/take-picture.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DoublephotosPageRoutingModule
  ],
  declarations: [DoublephotosPage,TakePictureComponent]
})
export class DoublephotosPageModule {}
