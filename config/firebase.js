// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore, initializeFirestore } from "firebase/firestore";
import Constants from "expo-constants";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  //apiKey: Constants.manifest.extra.apiKey,
  apiKey: "AIzaSyBSAZ_PeZiyCCpoeQDZOpeD66I7roZu2gc",
  authDomain: "cs-402-chatapplication.firebaseapp.com",
  projectId: "cs-402-chatapplication",
  storageBucket: "cs-402-chatapplication.appspot.com",
  messagingSenderId:"1017771635651",
  appId:  "1:1017771635651:web:fde10b9919f4e2f53c8376",
  databaseUrl:Constants.manifest.extra.databaseUrl
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
//export const database=getFirestore();
//const database=initializeFirestore(app,{experimentalForceLongPolling:true})
const database = initializeFirestore(app, {
    experimentalForceLongPolling: true, // this line
    useFetchStreams: false, // and this line
  })

export{database,auth};