document.addEventListener('DOMContentLoaded', function() {
    var elem = document.querySelector('.collapsible.expandable');
    var instance = M.Collapsible.init(elem, {
      accordion: false
    });
            });

            const firebaseConfig = {
             //your firebase configuration here
          
  };
  firebase.initializeApp(firebaseConfig);

  var ref = firebase.database().ref('pendingOrder');
  ref.once('value', (snapshot) => {
  
});



//show pending transaction
ref.orderByKey().on('child_added',function(snapshot,prevkey) {
//   var url =  'https://google.com';
// window.open(url, '_blank');
  document.getElementById('xyz').play();
  var uniqueKey = snapshot.key;
  uniqueKey = String(uniqueKey)
  var userKey;
  var exactAddress;
  var str = snapshot.key;
  console.log(str)
  var year = str.slice(1, 5);
  var month = str.slice(5,7);
  var day = str.slice(7,9);
  var hour = str.slice(9,11);
  var minute = str.slice(11,13);
  var second = str.slice(13,15)
  var title = year+"/"+month+"/"+day+" "+hour+":"+minute+":"+second;
var listText = "<div class='collapsible-header valign-wrapper'><i class='material-icons'>list</i>"+title+"</div><div class='collapsible-body'><span>"
var tableData = listText+"<table class='centered'><thead><tr><th>Name</th><th>Quantity</th><th>Total</th></tr></thead><tbody>";
   var divtest = document.createElement("li");
   divtest.className = uniqueKey;
  for (var key in snapshot.val()) {
    userKey = snapshot.val()[key].userID;
console.log(snapshot.val()[key])

if(snapshot.val()[key].deliveryLatitude==null||snapshot.val()[key].deliveryLongitude ==null)
{
  exactAddress = "0,0";
}
else{
  exactAddress = snapshot.val()[key].deliveryLatitude+","+snapshot.val()[key].deliveryLongitude;
   
}
    
    // console.log(key);
    // console.log(snapshot.val()[key].productID);
   tableData += "<tr><td>"+snapshot.val()[key].prductName+"</td><td>"+snapshot.val()[key].quantity+"</td><td>"+snapshot.val()[key].subTotal+"</td></tr>";
  }
 tableData +="</tbody></table><div class='row'><a class='waves-effect waves-light btn'><i class='material-icons right'>Done</i><input value='Done' type='submit' onclick=\'removeDatabase(\"" + uniqueKey + "\",\"" + userKey + "\");\'></a>";
 tableData +="<a class='col' href='/notify/"+userKey+"'>send Notification</a>";
 tableData +="<a class='col s10' href='https://www.google.com.np/maps/dir/"+exactAddress+"' target='_blank' rel='noopener noreferrer' >Delivery Location</a>";
 tableData +="</span></div></div></div>";
  divtest.innerHTML = tableData;
 document.getElementById("pendingOrderList").appendChild(divtest)

 console.log(userKey)
// test.appendChild(tableData);
//  test.innerHTML =tableData
});

function removeDatabase(s,uid)
{
  console.log("USer id:"+uid)
  const elements = document.getElementsByClassName(s);
  for (var i = 0; i < elements.length; i ++) {
    elements[i].style.display = 'none';
    }
 console.log(s)

 firebase.database().ref("pendingOrder/"+s).once("value",function(snapshot) {
  firebase.database().ref("completedOrder/"+s).set(snapshot.val()).then(function(){
    firebase.database().ref("pendingOrder").child(s).remove().then(function(){

  firebase.database().ref("Users/"+uid+"/completedOrder/"+s).set(snapshot.val()).then(function(){
    firebase.database().ref("Users/"+uid+"/Waiting/"+s).child(s).remove().then(function(){
      M.toast({html: 'Removed From Users as well'})
    }).catch(function(err){
      console.log(err)
    });
  })

 
    }).catch(function(err){
      console.log(err)
    });
  }); 
 });


}

  ref.on('child_removed', (snapshot) => {
  const deletedPost = snapshot.val();
  var key = snapshot.key;
  const elements = document.getElementsByClassName('"'+key+'"');
  for (var i = 0; i < elements.length; i ++) {
    elements[i].style.display = 'none';
}

  // console.log('The blog post titled \'' + deletedPost.title + '\' has been deleted');
});


      