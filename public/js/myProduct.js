const firebaseConfig = {
 //your firebase configuration here
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
