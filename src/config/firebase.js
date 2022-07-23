// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore/lite'
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA1OiHgSEgvbkyrEYEMbZfKcWtK6Thqo-g",
  authDomain: "todoapp-41d31.firebaseapp.com",
  projectId: "todoapp-41d31",
  storageBucket: "todoapp-41d31.appspot.com",
  messagingSenderId: "424594013015",
  appId: "1:424594013015:web:582647b6c92ad4e7cc1c12",
  measurementId: "G-V3FNPC1VK2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app);
const firestore=getFirestore(app);
const storage=getStorage(app);

export {analytics,auth,firestore,storage};