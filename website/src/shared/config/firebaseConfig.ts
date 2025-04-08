import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHN8PRasVraKV5aZpCa5ffKfeWpnF-hlg",
  authDomain: "sportsphere-f1f2e.firebaseapp.com",
  projectId: "sportsphere-f1f2e",
  storageBucket: "sportsphere-f1f2e.appspot.com",
  messagingSenderId: "181661385968",
  appId: "1:181661385968:web:70544de71eeeae6c24ae35"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Получение хранилища
export const storage = getStorage(app);