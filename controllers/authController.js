
var firebase = require("firebase");

var serviceAccount = require("./FirebaseServiceAccountKey.json");
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
var db = firebase.database();

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://foodie-19d4e-default-rtdb.firebaseio.com"
// })
// Firebase App.initializeApp() 
module.exports.home_get = (req, res) => {
  if(firebase.auth().currentUser == null)
  {
    console.log(firebase.auth().currentUser)
    res.render('home',{title:"Home"});
    // res.redirect('/dashboard')
  }
  else
  {
    //  res.render('home',{title:"Home"});

    res.redirect('/dashboard');
 }
}



module.exports.signup_get = (req, res) => {
  res.render('signup',{title:"Sign Up"});
}



module.exports.signup_post = async (req, res) => {
  var errorMessage = "";
  //var OrgRef = firebase.child("organizationUser");
  var OrganizationRef = firebase.database().ref("organizationUser/");
  console.log(req.body);
    const {name,email,address,phoneNumber,password,imageLink } = req.body.data;
    firebase.auth().createUserWithEmailAndPassword(email,password)
    .then((userCredential)=>{
      firebase.database().ref('orgUsers/'+firebase.auth().currentUser.uid).set({
        name,address,phoneNumber,imageLink
      }).then((out)=>{
        res.status(200).json({data:"Success"});
      }).catch((err)=>{
        res.status(400).json({error:"error occurred"});
        console.log(err);
      });
    }
    ).catch((err)=>{
     res.status(400).json({error:"error occurred"});
    });
   }




module.exports.login_get = (req, res) => {
    res.render('login',{title:"Login"});
  }




module.exports.login_post = (req, res) => 
{
    const { email, password } = req.body;
  console.log(req.body);
  firebase.auth().signInWithEmailAndPassword(email, password)
  .then((userCredential) => {

    var user = userCredential.user;
      console.log(user.uid);

      res.status(201).json(user);
    //  res.redirect(307, '/dashboard');
  }).catch((error) => {
    var errorCode = error.code;
    var errorMessage = error.message;
    res.status(400).json(errorMessage);
    console.log(errorMessage )
  });

}

module.exports.dashboard_put = (req,res) =>{
  console.log("wow")
 
}

module.exports.dashboard_get = (req, res) => {
  var user = firebase.auth().currentUser;
  var title= "Dashboard";
  var dataFetch;
  var ref = firebase.database().ref("pt");
  if(user)
  {   
    
   res.render('dashboard',{title,dataFetch});

  //   ref.once('value', (data) => {
  //   dataFetch = data.val();
  //   console.log(data.val())
  //  }); 

  //  ref.on('child_added', (snapshot, prevChildKey) => {
  //   const newPost = snapshot.val();
  //  console.log("Child added");
  // }); 
   
  //  ref.on('child_changed', (snapshot) => {
  //     const changedPost = snapshot.val();
  //     console.log('The updated post title is ' + changedPost.title);
  //   });


    
  }
  else
  {
    var data = {title:"error"}
    console.log("No user")
    res.redirect('/login');
  }
}




module.exports.dashboard_post = (req, res) => {
  const { itemName } = req.body;
  console.log(itemName);
  firebase.database().ref("orgUsers/"+firebase.auth().currentUser.uid+"/products/").push({
   itemName
  }).then((out)=>{
    res.status(201).json({data:"Success"});
  }).catch((err)=>{
    res.status(400).json({data:"error mf"});
  });
//res.render('dashboard');
}




module.exports.logout_get = (req, res) => {
  firebase.auth().signOut().then(() => {
    res.redirect('/')
  }).catch((error) => {
    console.log(error);
  });
}




module.exports.notify_post = (req,res) =>{
  var errorMessage = {data:""};
  const payload = {
    'notification': {
      'title': req.body.msgTitle,
      'body': req.body.msgBody,
      'priority':"high"
    }
  };
  var messageTitle = req.body.msgTitle;
  var messageBody = req.body.msgBody;
  if(messageTitle.length > 10)
  {
    errorMessage.data = "Please sent a title with 10 characters only"
  }
  if(messageBody.length > 40)
  {
    errorMessage.data = "Please sent a body with 40 characters only"
  }
var userToken = req.body.token;
  var options = payload;
  var message = {data:"Success"};
  const { admin } = require("../model/Admin");
  if(errorMessage.data){
  res.status(200).json(errorMessage);
  }
  else{
  admin.messaging().sendToDevice(userToken, options)
.then( response => {
  res.status(200).json(message);
console.log("Sucess");

})
.catch( error => {
    console.log(error);
});
  }
}





module.exports.notify_get = (req,res) => {
  console.log("ID "+ req.params.userId);
  firebase.database().ref("Users/"+req.params.userId).once('value', (snapshot) => {
    console.log(snapshot.val())
    var data = snapshot.val()
res.render('notify',{title:"notification",data});
  });
}




module.exports.myProduct_get = (req,res,next) =>{
if(firebase.auth().currentUser == null)
{
  res.redirect('/login');
}
var productData=null;
var ref = db.ref("products/")
ref.once("value", function(snapshot) {
  try { 
  var productData = snapshot.val();
  } catch (error) {
    console.log(error);
  }
  res.render('myProducts',{title:"My Products",products:productData});
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});

// console.log( firebase.auth().currentUser.uid);
//   res.render('myProducts',{title:"My Products",products:productData});
 
}




module.exports.profile_get = (req,res) =>{
  var ref = db.ref("orgUsers/"+firebase.auth().currentUser.uid+"/")
ref.once("value", function(snapshot) {
  var userData = snapshot.val();
 
  res.render('profile',{title:"profile",userData});
 // console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
}

module.exports.editproduct_get = (req,res) =>{
  console.log("ID "+ req.params.productId);
}


module.exports.addProduct_get = (req,res) =>{
  res.render('addProduct',{title:"Add a Product"})
}




module.exports.addProduct_post = (req,res) =>{
 console.log(req.body.data)
 var data={error:"No error"};
 var rating = 0.0;
 var name = req.body.data.name;
 var imageLink = req.body.data.imageLink;
 var price = req.body.data.price;
 var briefDescription = req.body.data.briefDescription
 var itemType = req.body.data.itemType
 firebase.database().ref("products/").push({
  name,imageLink,price,briefDescription,itemType,rating
 }).then((out)=>{
   res.status(201).json({data:"Success"});
 }).catch((err)=>{
   res.status(400).json(data.error = "Error");
 });
}

