var firebase = require("firebase");

var serviceAccount = require("../controllers/FirebaseServiceAccountKey.json");
class items{
  constructor(itemsName)
  {
    this.itemName = itemsName;
  }
}

firebase.initializeApp({
  apiKey:"AIzaSyCSL3LRCgUeW9oC5yDw6egAdT1IzQ5rg7k",
  databaseURL: "https://foodie-19d4e-default-rtdb.firebaseio.com"
});

module.exports.firebase = firebase;