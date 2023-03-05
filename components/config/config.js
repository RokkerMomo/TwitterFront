// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkIMG2Zmvaj063su55aRPXrcwCDoD6ixE",
  authDomain: "movilestwitter-395ad.firebaseapp.com",
  projectId: "movilestwitter-395ad",
  storageBucket: "movilestwitter-395ad.appspot.com",
  messagingSenderId: "554675771008",
  appId: "1:554675771008:web:34ba97205e4a757ba0b865"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const storage = getStorage(app);