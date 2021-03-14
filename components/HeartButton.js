import { firestore, auth, increment } from "../lib/firebase";
import { useDocument } from "react-firebase-hooks/firestore";

// Allows user to heart or like a post
export default function Heart({ postRef }) {
  // Listen to heart document for currently logged in user
  const heartRef = postRef.collection("hearts").doc(auth.currentUser.uid);
  const [heartDoc] = useDocument(heartRef);

  // Create a user-to-post relationship
  const addHeart = async () => {
    const uid = auth.currentUser.uid;
    // we use a batch here because we are both updating the heart count and
    // creating a new document ( in the db a heart doc contains a uid )
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(1) });
    batch.set(heartRef, { uid });

    await batch.commit();
  };

  // Remove a user-to-post relationship
  const removeHeart = async () => {
    // we use a batch here because we are both updating the heart count and
    // deleting a heart document ( in the db a heart doc contains a uid )
    const batch = firestore.batch();

    batch.update(postRef, { heartCount: increment(-1) });
    batch.delete(heartRef);

    await batch.commit();
  };

  return heartDoc?.exists ? (
    <button onClick={removeHeart}>💔 Unheart</button>
  ) : (
    <button onClick={addHeart}>💗 Heart</button>
  );
}
