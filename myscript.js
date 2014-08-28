document.addEventListener("submit", function(e) {
  var inputs = document.getElementsByTagName("input");
  var res;
  
  for (var i = 0; i < inputs.length; i++) {
    if (inputs[i].type.toLowerCase() === "password") {
      if(inputs[i].value)
        res = inputs[i].form;
    }
  }
  
  chrome.runtime.sendMessage({type: "username", msg: uId.value}, function(response) {
    alert("Communication is done!");
  });
});

