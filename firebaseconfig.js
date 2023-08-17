import { initializeApp } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-auth.js";
import { getFirestore, collection, addDoc, getDocs, doc, updateDoc, setDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.1.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC-T-PF237_CGpuT0jcHvSG36sGB9ckAz8",
  authDomain: "careernexa.firebaseapp.com",
  projectId: "careernexa",
  storageBucket: "careernexa.appspot.com",
  messagingSenderId: "368656411778",
  appId: "1:368656411778:web:34d49aee7431d1bdc5989b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize AUTH
const auth = getAuth();

// Initialize Cloud Firestore 
const db = getFirestore(app);


export {
    db,
    auth,

}