const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
const admin = require('firebase-admin');
const firebase = require('firebase');
// middleware
app.use(express.static('public'));
app.use(express.json());

const product = require('./model/orgProduct');


// firebase.auth().signInWithEmailAndPassword("qwe@qwe.com", "qweqwe")


// view engine
app.set('view engine', 'ejs');

app.listen(process.env.PORT ||4000);
console.log("Listening in port 4000")

// routes

app.use(authRoutes);