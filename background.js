/*
 * Copyright 2014 InHwan Kim, BoSung Kim, DuHee Ye
 * Released under the MIT license
 * https://github.com/hwanud/SecureInfo/LICENSE.md
 */

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "GetInput") {
      console.log("Received!");
      console.log(request.url);
      var url = "url#"+request.url;
      console.log(request.type);
      //console.log(request.data);
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
      /*
       * Once user has logined or signed-up the page,
       * user's privacy data will be stored in google sync.
       * If the data's host name is new that is not stored,
       * then data that has url key value is creates.
       * Otherwise data that already exists, increase the data's count value.
       * Author: Duhee Ye
       */
      var arr ={};
      chrome.storage.sync.get(null, function(obj) {
          //for(var i = 0; i < obj[key].length; i++) {
          // console.log(obj[key][i].name,":",obj[key][i].value);
          var allkeys = Object.keys(obj);

          if(allkeys.lastIndexOf(url) >= 0){
            key = url;
            data = request.data.slice(0);
			var item = obj[key];
			var itemLen = item.length;
            //data = {lastPass: request.time, count: obj[key].count+1};
            data.push({name: 'lastPass', value: request.time},
                      {name: 'count', value: item[itemLen-1].value+1});
            console.log(item[itemLen-1].value);
            arr[key] = data;
            chrome.storage.sync.set(arr, function() {
              console.log("exist!");

            });

            console.log(obj[key]);
          }else
          {
            key = url;
            //data = {lastPass: request.time, count: 1}
            data = request.data.slice(0);
            data.push({name: 'lastPass', value: request.time},
                      {name: 'count', value:1});
            arr[key] = data;
            chrome.storage.sync.set(arr, function() {
              console.log("not exist!");
            });
          }
          //}
          arr={};
          key = "time#"+request.time;
          data = request.data.slice(0);
          data.push({name: 'hostName', value: request.url},
                    {name: 'status', value: request.type});
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
