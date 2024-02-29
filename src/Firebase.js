import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey:process.env.REACT_APP_FIRE_BASE_KEY  ,
  authDomain: "authapp-a3929.firebaseapp.com",
  projectId: "authapp-a3929",
  storageBucket: "authapp-a3929.appspot.com",
  messagingSenderId: "956032041381",
  appId: "1:956032041381:web:7fe30d175e47a6e4e9e84c"
};


export const app = initializeApp(firebaseConfig);