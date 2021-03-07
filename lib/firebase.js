/**
 * Before this we created a new firebase project and enabled google auth as well
 * as firestore. The api key is collected from firebase console.
 */

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyB9nV_d0dw5obkKOjpcg2FOW0l6PeBjKA4",
  authDomain: "spark-c03f1.firebaseapp.com",
  projectId: "spark-c03f1",
  storageBucket: "spark-c03f1.appspot.com",
  messagingSenderId: "818433972700",
  appId: "1:818433972700:web:c3b7eafc8cd45bc8e85719",
  measurementId: "G-QS2CE12LXN",
};

// Since it is possible that next will run this twice and thus attempt creating
// a next app twice, we wrap this code block in the if

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

// initalize the firebase sdks that we want to work with
export const auth = firebase.auth();
export const firestore = firebase.firestore();
export const storage = firbase.storage();
