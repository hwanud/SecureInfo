chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.action == "GetInput") {
      console.log("Received!");
      console.log(request.data);
      console.log(request.time);
    }
});