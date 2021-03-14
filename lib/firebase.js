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
export const STATE_CHANGED = firebase.storage.TaskEvent.STATE_CHANGED;

// For testing purposes we installed the firebase command line tools with
// firebase-tools -g and then ran firebase init to create a new firebase project
// this allows for emulation of the cloud environment locally

// Firestore exports
export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp;
export const fromMillis = firebase.firestore.Timestamp.fromMillis;
export const increment = firebase.firestore.FieldValue.increment;

/**`
 * Gets a users/{uid} document with username
 * @param  {string} username
 */
export async function getUserWithUsername(username) {
  const usersRef = firestore.collection("users");
  const query = usersRef.where("username", "==", username).limit(1);
  const userDoc = (await query.get()).docs[0];
  return userDoc;
}

/**`
 * Converts a firestore document to JSON
 * @param  {DocumentSnapshot} doc
 */
export function postToJSON(doc) {
  const data = doc.data();
  return {
    ...data,
    // Gotcha! firestore timestamp NOT serializable to JSON. Must convert to milliseconds
    createdAt: data?.createdAt.toMillis() || 0,
    updatedAt: data?.updatedAt.toMillis() || 0,
  };
}
