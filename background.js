chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "GetInput") {
      console.log("Received!");
      console.log(request.url);
      console.log(request.type);
      console.log(request.data);
      console.log(request.time);
      
      var key = request.time.toString();
      var data = request.data;
     
      var arr ={};
      arr[key] = data;
      chrome.storage.sync.set(arr, function() {
        console.log("Store!");
      });
      
      chrome.storage.sync.get(key, function(obj) {
          for(var i = 0; i < obj[key].length; i++) {
            console.log(obj[key][i].name,":",obj[key][i].value);
          }
      });
    }
});