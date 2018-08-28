"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
const admin = require("firebase-admin");
admin.initializeApp();
// Cloud Vision
const vision = require("@google-cloud/vision");
const visionClient = new vision.ImageAnnotatorClient();
exports.imageTagger = functions.storage
    .object()
    .onFinalize((event) => __awaiter(this, void 0, void 0, function* () {
    // File data
    const fileBucket = event.bucket;
    const filePath = event.name;
    // Location of saved file in bucket
    const imageUri = `gs://ionic-fitme.appspot.com/${filePath}`;
    const docId = filePath.split('.jpg')[0];
    const docRef = admin.firestore().collection('photos').doc(docId);
    // Await the cloud vision response
    const results = yield visionClient.labelDetection(imageUri);
    // Map the data to desired format
    const labels = results[0].labelAnnotations.map(obj => obj.description);
    return docRef.set({ labels });
}));
//# sourceMappingURL=index.js.map