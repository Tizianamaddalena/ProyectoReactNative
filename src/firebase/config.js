import app from "firebase/app";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCdJ9HWq3PRCllJozDpj4Z73w1hxBOUUwY",
  authDomain: "proyectoreactnative-79ac7.firebaseapp.com",
  projectId: "proyectoreactnative-79ac7",
  storageBucket: "proyectoreactnative-79ac7.appspot.com",
  messagingSenderId: "787120794703",
  appId: "1:787120794703:web:ce49aa7b906a53b86d8e3a"
};


app.initializeApp(firebaseConfig);

export const auth = firebase.auth(); // funcionalidad autenticacion
export const db = app.firestore(); // base de datos
export const storage = app.storage(); // almacenamiento de archivos
