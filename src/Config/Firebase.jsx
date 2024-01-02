import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAM5uMQuNEXODY4YJ5GrU0YkE9WG4W4gB4",
  authDomain: "littlelemon-ace0a.firebaseapp.com",
  databaseURL: "https://littlelemon-ace0a-default-rtdb.firebaseio.com",
  projectId: "littlelemon-ace0a",
  storageBucket: "littlelemon-ace0a.appspot.com",
  messagingSenderId: "493422496532",
  appId: "1:493422496532:web:0c6cc2a9f9788e51a9d001",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
