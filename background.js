chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    console.log("Got a msg!");
    
    if(request.type == "username")
      console.log(request.msg);
});

