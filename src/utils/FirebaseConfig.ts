import { initializeApp } from 'firebase/app';

// Optionally import the services that you want to use
// import {...} from 'firebase/auth';
// import {...} from 'firebase/database';
import {getFirestore} from 'firebase/firestore';
// import {...} from 'firebase/functions';
// import {...} from 'firebase/storage';

// Initialize Firebase
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA1oWBtK5SftgzdtjBZ3Ni2vub-ZDT5bqs",
  authDomain: "wordle-clone-4a37b.firebaseapp.com",
  projectId: "wordle-clone-4a37b",
  storageBucket: "wordle-clone-4a37b.firebasestorage.app",
  messagingSenderId: "1078656028231",
  appId: "1:1078656028231:web:89db2cc025de56f2c56b62"
};


const app = initializeApp(firebaseConfig);
export const FIRESTORE_DB = getFirestore(app);
// For more information on how to access Firebase in your project,
// see the Firebase documentation: https://firebase.google.com/docs/web/setup#access-firebase
