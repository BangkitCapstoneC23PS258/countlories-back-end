import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider} from ‘firebase/auth’
const provider = new GoogleAuthProvider();

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
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.post('/register', async(req, res) => {
try {
    const {email, username, password} = req.body;
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        console.log(user);
    })
        .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error);
    });
    res.redirect('/');
} catch(e) {
    res.redirect('register');
}
})