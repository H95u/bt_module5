// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAbfgzibObiOkbWl2phk9fOVB6tRS3Gw-M",
    authDomain: "module5-img.firebaseapp.com",
    projectId: "module5-img",
    storageBucket: "module5-img.appspot.com",
    messagingSenderId: "245677452050",
    appId: "1:245677452050:web:2c4cce776dfe49826b61cb",
    measurementId: "G-97MHHRW984"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);