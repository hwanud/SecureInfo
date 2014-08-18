document.addEventListener("submit", function(e) {
  var uId = document.getElementById("email");
  
  alert(uId.value);
  
  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(reponse.farewell);
  });
});