require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const app = express();
const admin = require('firebase-admin');
const firebase = require('firebase');

// middleware
app.use(express.static('public'));
app.use(express.json());


// firebase.auth().signInWithEmailAndPassword("qwe@qwe.com", "qweqwe")

console.log(process.env.NAME)

// view engine
app.set('view engine', 'ejs');

app.listen(process.env.PORT ||4000);
console.log("Listening in port 4000")

// routes

app.use(authRoutes);