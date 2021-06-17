const admin = require('firebase-admin');
var serviceAccount = require("../controllers/FirebaseServiceAccountKey.json");
//var userSent = "dQXinMUDTiOY_ZKyLEF3YK:APA91bFTvmMkihaceGfSauR2C7i2Q4XJxBatz45Fjr5lRKsUNUKd2oXZ9HAF8_3EOvi0mu-B0et4qZHQFVOoDBjFbjFMYa0w_YxTQHJ9ApHBtDeum8Dp59uHNDtYKyeoVtX7EBbtec6S";
var userSent="d5TK0eHSR_e4h9xJfze_5e:APA91bECu_jK4pmtw2vfvop57rZTWVZjMDrunmcuK4UHYUZRgNEJAV_EGsnABtMDj6yTa01MH3mXwLmJpeUq2_G6uV5vJvo1bF67lj4aNz5BSNAzZemiTvTDV2d1zlcMppvczXJt0h4z";
const payload = {
    'notification': {
      'title': "testin just logged an event",
      'body': "also a test",
    }, 
    // NOTE: The 'data' object is inside payload, not inside notification
    
  };

  var options = payload;
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://foodie-19d4e-default-rtdb.firebaseio.com/"
});


module.exports.admin = admin;

// admin.messaging().sendToDevice(userSent, options)
// .then( response => {
// console.log("Sucess");
 
// })
// .catch( error => {
//     console.log(error);
// });
