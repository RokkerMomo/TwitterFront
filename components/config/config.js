// // Import the functions you need from the SDKs you need
// import firebase from 'firebase/compat/app';
// import 'firebase/compat/auth'
// import 'firebase/compat/firestore'
// import 'firebase/compat/storage'
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDkIMG2Zmvaj063su55aRPXrcwCDoD6ixE",
//   authDomain: "movilestwitter-395ad.firebaseapp.com",
//   projectId: "movilestwitter-395ad",
//   storageBucket: "movilestwitter-395ad.appspot.com",
//   messagingSenderId: "554675771008",
//   appId: "1:554675771008:web:34ba97205e4a757ba0b865"
// };

// if (!firebase.apps.length){
//   firebase.initializeApp(firebaseConfig)
// }

// export {firebase}

import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import 'react-native-get-random-values';
import { v4 as uuidv4 } from "uuid";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDkIMG2Zmvaj063su55aRPXrcwCDoD6ixE",
  authDomain: "movilestwitter-395ad.firebaseapp.com",
  projectId: "movilestwitter-395ad",
  storageBucket: "movilestwitter-395ad.appspot.com",
  messagingSenderId: "554675771008",
  appId: "1:554675771008:web:34ba97205e4a757ba0b865"
};

const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);

export async function UploadFile(file,name){
  const storageRef = ref(storage, name)
  await uploadBytes(storageRef,file)
  const url = await getDownloadURL(storageRef)
  return url
}