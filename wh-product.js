var form = document.getElementById('form');
var formDesignId = document.getElementById('designId');
var button = document.getElementById('button');
var buttonText = button.textContent;
var designerWindow = document.getElementById('designer').contentWindow;

//if the iframe is in a different domain
//get the iframe like this
function getDesignId(callback) {
  var waiting = true;
  designerWindow.postMessage('GET_DESIGN_ID');
  function handleResponse(event){
    if(waiting){
      waiting = false;
      if(event != undefined && event.data != undefined)
        callback(false, event.data);
      else
        callback(true, null);
    }
  }
  setTimeout(handleResponse, 2000)
  window.addEventListener('message', handleResponse);
}

//if the iframe is in the same domain
//get the design id like this
function getDesignId2(){
  
}

//intercept the normal add to cart form post
//and cause it to wait for the design ID to be created
form.addEventListener('submit', function (event) {
  event.preventDefault();
  button.textContent = "Wait...";
  getDesignId(function(error, designId){
    button.textContent = buttonText;
    if(error){
      alert('ERROR');
    }else{
      formDesignId.value = designId
      form.submit();
    }
  })
});

