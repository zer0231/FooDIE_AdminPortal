// const process = require('./env');
console.log(process.TYPE)
const firebaseConfig = {
 //Add your config here
  };
  firebase.initializeApp(firebaseConfig);

  const form = document.querySelector('form');
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    M.toast({html: "Adding your product..."});
   upload(form).then(data=>{
     console.log(data);
     const res =  fetch('/dashboard/addProduct',{
       method:'POST',
       body: JSON.stringify({data}),
                headers: {'Content-Type': 'application/json'}
    
     }).then(res =>{
      if(res.status == 201)
      {
        M.toast({html: "Product Add SuccessFul"});
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