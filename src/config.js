import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyDZg6X4kaCp6ZmrG-dXdRIufmK_g-x26bE",
    authDomain: "hahha-chatroom.firebaseapp.com",
    projectId: "hahha-chatroom",
    storageBucket: "hahha-chatroom.appspot.com",
    messagingSenderId: "882434854484",
    appId: "1:882434854484:web:903487ed019ebfc8c167c1",
    measurementId: "G-XG07L4F5D2"
  };

  
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()