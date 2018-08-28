import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FoodrecognizePage } from './foodrecognize';

@NgModule({
  declarations: [
    FoodrecognizePage,
  ],
  imports: [
    IonicPageModule.forChild(FoodrecognizePage),
  ],
})
export class FoodrecognizePageModule {}
