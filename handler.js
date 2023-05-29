import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
const express = require('express')
const app = express()

const firebaseConfig = {
  apiKey: "AIzaSyBbA_YoJtZRF8ITT4nX4sIs5VrkHDniAFo",
  authDomain: "capstone-countlorie.firebaseapp.com",
  projectId: "capstone-countlorie",
  storageBucket: "capstone-countlorie.appspot.com",
  messagingSenderId: "328369780290",
  appId: "1:328369780290:web:516647c98a831e93951fdb",
  measurementId: "G-5L7G4BW913"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);