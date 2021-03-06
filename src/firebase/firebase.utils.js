import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

window.firebase = firebase;
// allows you to take in something like a display name - additionalData
export const createUserProfileDocument = async (user, additionalData) => {
  if (!user) return;
  // Get a reference to the place in the database where a user profile might be
  const userRef = firestore.doc(`users/${user.uid}`);

  // Go and fetch the document from that location.
  const snapshot = await userRef.get();

  if (!snapshot.exists) {
    const { displayName, email } = user;
    const createdAt = new Date();
    try {
      // seeing we know the uid we just want to set it
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch (error) {
      console.error("Error fetching user", error.message);
    }
  }
  return getUserDocument(user.uid);
};
export const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore
      .collection("users")
      .doc(uid)
      .get();
    return { uid, ...userDocument.data() };
  } catch (error) {
    console.error("Error fetching user", error.message);
  }
};

export const firestore = firebase.firestore();
export const auth = firebase.auth();

export const provider = new firebase.auth.GoogleAuthProvider();

export const signInWithGoogle = () => auth.signInWithPopup(provider);
export const signOut = () => auth.signOut();

export default firebase;
