import { Component } from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';

import { Observable } from 'rxjs/Observable';
import { tap, filter } from 'rxjs/operators';

import { AngularFireStorage, AngularFireUploadTask } from 'angularfire2/storage';
import { AngularFirestore} from 'angularfire2/firestore';

import { Camera, CameraOptions } from '@ionic-native/camera';
import * as firebase from "firebase";






@IonicPage()
@Component({
  selector: 'page-foodrecognize',
  templateUrl: 'foodrecognize.html',
})
export class FoodrecognizePage {

  // Upload task
  task: AngularFireUploadTask;

  // Firestore data
  result$: Observable<any>;
  foodLabel;

  loading: Loading;
  image: string;
  photo:any;

  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: AngularFireStorage,
              private afs: AngularFirestore, private camera: Camera, private loadingCtrl: LoadingController) {
    this.loading = this.loadingCtrl.create({
      content: 'I am still learning...wait for some time'});
    const firestore = firebase.firestore();
    const settings = {timestampsInSnapshots: true};
    firestore.settings(settings);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FoodrecognizePage');
  }

  startUpload(file: string) {

    // Show loader
    this.loading.present();


    const docId = this.afs.createId();

    const path = `${docId}.jpg`;

    // Make a reference to the future location of the firestore document
    const photoRef = this.afs.collection('photos').doc(docId)
    console.log(photoRef);
    // Firestore observable, dismiss loader when data is available
    this.result$ = photoRef.valueChanges()
      .pipe(
        filter(data => !!data),
        tap(res => {this.loading.dismiss()})
      );
    console.log(this.result$);

    // The main task
    this.image = 'data:image/jpg;base64,' + file;
    let cameraImageSelector = document.getElementById('camera-image');
    cameraImageSelector.setAttribute('src', this.image);
    this.task = this.storage.ref(path).putString(this.image, 'data_url');
  }

  // Gets the pic from the native camera then starts the upload
  async captureAndUpload() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500
    };

    const base64 = await this.camera.getPicture(options)


    this.startUpload(base64);

  }
  // ask;
  //
  // calculateCalorie(){
  //
  //   this.life.postRequest(this.ask, this.sex, this.weight, this.height, this.age);
  // }

  }
