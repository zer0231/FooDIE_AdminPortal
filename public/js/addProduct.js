const firebaseConfig = {
    apiKey: "AIzaSyCSL3LRCgUeW9oC5yDw6egAdT1IzQ5rg7k",
    authDomain: "foodie-19d4e.firebaseapp.com",
    databaseURL: "https://foodie-19d4e-default-rtdb.firebaseio.com",
    projectId: "foodie-19d4e",
    storageBucket: "foodie-19d4e.appspot.com",
    messagingSenderId: "836191715653",
    appId: "1:836191715653:web:8a672d63407970cb567e2c",
    measurementId: "G-JED9GHVKPS"
  };
  firebase.initializeApp(firebaseConfig);

  const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
  
   upload(form).then(data=>{
     console.log(data);
     const res =  fetch('/dashboard/addProduct',{
       method:'POST',
       body: JSON.stringify({data}),
                headers: {'Content-Type': 'application/json'}
    
     }).then(res =>{
      if(res.status == 201)
      {
        alert("Product Added");
        // window.location = "/dashboard/myProducts";
      }
      else{
        alert("try again");
      }
     });

          
   }).then(response=>{
        console.log(response);
     }).catch(err=>{
       console.log(err);
     });
    });

    async function upload(form)
{  
  const Iname = Math.random().toString(36).substring(2,29);
      console.log(Iname);
    var error = "false";
   const name = form.name.value;
    const briefDescription = form.briefDescription.value;
    const price = form.price.value;
    const itemType = form.itemType.value;
    const orgImage = form.proImage.files[0];
    console.log(itemType)
    if(itemType == '0')
    {
      error = "true:input type";
    }
  
    const imageLink = '';
    
    const metadata = {contentType:orgImage.type}
    var  dataFetch = {};
    if(error == "false")
    {
    const ref = firebase.storage().ref();
  const task = ref.child(Iname).put(orgImage,metadata);
    await task.then(snapshot => snapshot.ref.getDownloadURL())
            .then(url =>{
              var imageLink  = url;  
                   dataFetch = {name,briefDescription,itemType,price,imageLink};
            });
            return dataFetch;        
          }
          else
          {
            console.log(error);
          }
        }