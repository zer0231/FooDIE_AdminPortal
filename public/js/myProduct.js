const firebaseConfig = {
  apiKey: "AIzaSyC3u0nbB9lH7bOUd5Qc38qBeCSDMje5lI0",
  authDomain: "foodie-19d4e.firebaseapp.com",
  databaseURL: "https://foodie-19d4e-default-rtdb.firebaseio.com",
  projectId: "foodie-19d4e",
  storageBucket: "foodie-19d4e.appspot.com",
  messagingSenderId: "836191715653",
  appId: "1:836191715653:web:dfb851cb44e3e883567e2c",
  measurementId: "G-LN2MPRKEGD"
  };
  firebase.initializeApp(firebaseConfig);

function deleteProduct(id)
{
  
    firebase.database().ref('products/' + id+'/status').set("unavailable");
    M.toast({html: 'Removed'+id});
    var deletedCard = document.getElementById(id);
    deletedCard.style.display = 'none'; 
    // window.location.replace("/dashboard/myProducts");
}



  var jsonValue = document.getElementById("jsonValue").value;
var jsonArray = JSON.parse(jsonValue)
var key = Object.keys(jsonArray)[0]
console.log(key)
// console.log('"'+key+'"')
console.log(jsonArray[key].itemName)
