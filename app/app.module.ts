import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { GaugeModule } from 'angular-gauge';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import {ProgressBarModule} from "angular-progress-bar";
import { LifeRestProvider } from '../providers/life-rest/life-rest';
import {HttpClientModule} from "@angular/common/http";
import {AngularFireModule} from "angularfire2";
import {AngularFirestoreModule} from "angularfire2/firestore";
import {AngularFireStorageModule} from "angularfire2/storage";
import { Camera } from '@ionic-native/camera';
import {FoodrecognizePage} from "../pages/foodrecognize/foodrecognize";

const firebaseConfig = {
  apiKey: "AIzaSyBRS7_pq-ypEqem0brt0ipD5-F9mCLFBig",
  authDomain: "ionic-fitme.firebaseapp.com",
  databaseURL: "https://ionic-fitme.firebaseio.com",
  projectId: "ionic-fitme",
  storageBucket: "ionic-fitme.appspot.com",
  messagingSenderId: "869455119335"
};

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    FoodrecognizePage,
  ],
  imports: [
    BrowserModule,
    ProgressBarModule,
    HttpClientModule,
    GaugeModule.forRoot(),
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage,
    FoodrecognizePage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LifeRestProvider,
    Camera
  ]
})
export class AppModule {}
