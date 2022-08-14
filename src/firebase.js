// For Firebase JS SDK v7.20.0 and later, measurementId is optional

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
      apiKey: "AIzaSyChlVzj9H87sKXofFWiM72vjryOCX9O1xE",
      authDomain: "clone-7b5ec.firebaseapp.com",
      projectId: "clone-7b5ec",
      storageBucket: "clone-7b5ec.appspot.com",
      messagingSenderId: "815020410158",
      appId: "1:815020410158:web:facd79236fd804551a66bf",
      measurementId: "G-B5JWKEH937"
    };

    const firebaseApp = firebase.initializeApp(firebaseConfig);

    const db = firebaseApp.firestore();
    const auth = firebase.auth();

    export { db, auth };
