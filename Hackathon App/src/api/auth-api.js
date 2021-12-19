import { initializeApp, } from "firebase/app";
import { getAuth, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";
import { updateDoc, increment, getFirestore, doc, setDoc, getDoc, getDocs, collection, query, where, onSnapshot, addDoc, orderBy } from "firebase/firestore"
import { FIREBASE_CONFIG } from "../core/config";



initializeApp(FIREBASE_CONFIG)

const auth = getAuth();
const db = getFirestore();

const logoutUser = async () => {
  await signOut(auth).then(() => {
    console.log("SignOut Successful")
  })

}

const signUpUser = async ({ name, email, password }) => {
  await createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage
    });
}

const loginUser = async ({ email, password }) => {
  await signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      return user
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage
    });
}

const sendEmailWithPassword = (email) => {
  sendPasswordResetEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      return;
      // ..
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      return errorMessage;
      // ..
    });
}

const authState = async () => {
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/firebase.User
      const uid = user.uid;
      return true;
      // ...
    } else {
      // User is signed out
      // ...
      return false;
    }
  });

}

const saveData = async(data) => {
  await getDoc(doc(db, "Applications",data.cnic))
  .then(()=>{})
  .catch(()=>{
    setDoc(doc(db, "Applications", data.cnic), {...data, permission: 'pending'})
    .then(()=>{
        console.log("success");
        return true
    }).catch(err=>{
        console.log("masla");
    })
  })
  
}

export {
  logoutUser,
  signUpUser,
  loginUser,
  sendEmailWithPassword,
  authState,
  saveData,
  db,
  doc,
  getDoc,
  getDocs,
  collection,
  query,
  where,
  onSnapshot,
  addDoc,
  orderBy,
  increment,
  updateDoc,
  setDoc,
};