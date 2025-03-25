// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDoVKzcZw7ulvT6BNgPVdirrQiJ58-kaHY",
  authDomain: "dhunlay-2e3d3.firebaseapp.com",
  projectId: "dhunlay-2e3d3",
  storageBucket: "dhunlay-2e3d3.firebasestorage.app",
  messagingSenderId: "1031310251801",
  appId: "1:1031310251801:web:8eb36681b2febfe27b9788",
  measurementId: "G-ZWZZS8FQY0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const storage = getStorage(app);

async function uploadFile(file) {
  const storageRef = ref(storage, `songs/${file.name}`);
  await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(storageRef);
  console.log("File uploaded:", downloadURL);
}
