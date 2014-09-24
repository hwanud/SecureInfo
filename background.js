chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "GetInput") {
      console.log("Received!");
      console.log(request.url);
      var url = "url#"+request.url;
      console.log(request.type);
      console.log(request.data);
      console.log(request.time);
      
      var key = request.time.toString();
      var data = request.data;
      
      /* 
       * test for appending JSON Object
       * added by bokor
      data.push({name: 'status', value: request.type});
      data.push({name: 'timestamp', value: request.time});
      
      console.log(data);
      */
     
      var arr ={};
      //arr[key] = data;
      //chrome.storage.sync.clear();
      chrome.storage.sync.get(null, function(obj) {
          //for(var i = 0; i < obj[key].length; i++) {
           // console.log(obj[key][i].name,":",obj[key][i].value);
          var allkeys = Object.keys(obj);
          
          if(allkeys.lastIndexOf(url) >= 0){
            key = url;
            data = {lastPass: request.time, count: obj[key].count+1};
            arr[key] = data;
            chrome.storage.sync.set(arr, function() {
              console.log("exist!");
            })
          }else
          {
            key = url;
            data = {lastPass: request.time, count: 1}
            arr[key] = data;
            chrome.storage.sync.set(arr, function() {
              console.log("not exist!");
            });
          }
          //}
          arr={};
          key = "time#"+request.time;
          data = request.data;
          arr[key] = data;
          chrome.storage.sync.set(arr, function() {
              console.log("Store!");
            });
            
          //chrome.storage.sync.clear();
          
          chrome.storage.sync.get(null, function(obj) {
            allkeys = Object.keys(obj);
            console.log(allkeys);
            console.log(obj["url#"+request.url]);
          });
      });
     
      
      
      
    }
});
