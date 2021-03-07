import { auth, firestore } from "../lib/firebase";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";

function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  // listen to realtime data (sub to user auth)
  useEffect(() => {
    let unsubscribe;

    if (user) {
      const ref = firestore.collection("users").doc(user.uid);
      // we call this unsubscribe because when called firebase will unsub from that data
      unsubscribe = ref.onSnapshot((doc) => {
        setUsername(doc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}

export default useUserData;
