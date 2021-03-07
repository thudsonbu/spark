/**
 * Before this we created a new firebase project and enabled google auth as well
 * as firestore. The api key is collected from firebase console.
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

// firebase config
import firebaseConfig from "../firebaseConfig";

// Since it is possible that next will run this twice and thus attempt creating
// a next app twice, we wrap this code block in the if

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// initalize the firebase sdks that we want to work with
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
export const firestore = firebase.firestore();
export const storage = firebase.storage();

// For testin purposes we installed the firebase command line tools with
// firebase-tools -g and then ran firebase init to create a new firebase project
// this allows for emulation of the cloud environment locally
