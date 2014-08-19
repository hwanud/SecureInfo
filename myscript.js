document.addEventListener("submit", function(e) {
  var uId = document.getElementById("email");
  
  alert(uId.value);
  
  chrome.runtime.sendMessage({type: "username", msg: uId.value}, function(response) {
    alert("Communication is done!");
  });
});