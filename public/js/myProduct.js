
function deleteProduct(id)
{
    M.toast({html: 'Removed'})
 
}



  var jsonValue = document.getElementById("jsonValue").value;
var jsonArray = JSON.parse(jsonValue)
var key = Object.keys(jsonArray)[0]
console.log(key)
// console.log('"'+key+'"')
console.log(jsonArray[key].itemName)
