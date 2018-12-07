var form = document.getElementById('form');
var formDesignId = document.getElementById('designId');

window.addEventListener('message', function(event){
  var message = event.data
  if( message ){
    console.log(message.data.cxDocumentId)
    formDesignId.value = message.data.cxDocumentId
    form.submit();
  }
});