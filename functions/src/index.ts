import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });

import * as admin from 'firebase-admin';
admin.initializeApp();

// Cloud Vision
import * as vision from '@google-cloud/vision';

const visionClient =  new vision.ImageAnnotatorClient();

export const imageTagger = functions.storage

  .object()
  .onFinalize( async event => {

    // File data

    const fileBucket = event.bucket;
    const filePath = event.name;
    // Location of saved file in bucket
    const imageUri = `gs://ionic-fitme.appspot.com/${filePath}`;
    const docId = filePath.split('.jpg')[0];

    const docRef  = admin.firestore().collection('photos').doc(docId);

    // Await the cloud vision response
    const results = await visionClient.labelDetection(imageUri);

    // Map the data to desired format
    const labels = results[0].labelAnnotations.map(obj => obj.description);


    return docRef.set({ labels });
  });

