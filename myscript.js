/*
 * Copyright 2014 InHwan Kim, BoSung Kim, DuHee Ye
 * Released under the MIT license
 * https://github.com/hwanud/SecureInfo/blob/master/LICENSE.md
 */


/**
 * in case we don't have any forms, we might have a chance to have
 * input data without form tag.
 * Author: InHwan Kim
 */
handleNoFormInputs();

/**
 * Find all the closest forms from the input type password tags.
 * Author: BoSung Kim
 */
var mForm = $('input[type=password]').closest("form");

if (mForm.length) { // if there are forms found, process information.
  for (var i = 0; i < mForm.length; i++) {
    if (typeof $(mForm[i]).attr('id') == 'undefined')
      mForm[i].id = 'catchedByTMPIU' + i;

    $("#"+$(mForm[i]).attr('id')).submit(function(e) {
      // debug
      //alert("catch!");

      // get the current URL
      var mURL = window.location.hostname;

      // get the current local time
      var mDate = new Date();
      var mLocalTime = (mDate.getMonth()+1) + '/' + mDate.getDate() + '/'
                      + mDate.getFullYear() + ' ' + mDate.getHours() + ':'
                      + mDate.getMinutes() + ':' + mDate.getSeconds();

      var mBuf = $("#" + $(this).attr('id') + " :text").serializeArray();
      var mTexts = [];

      // get the filled form data
      for (var i = 0; i < mBuf.length; i++) {
        if (mBuf[i].value.length != 0)
          mTexts.push(mBuf[i]);
      }

      // check the type
      var mType;
      if(mTexts.length > 1)
        mType = "Sign-up";
      else
        mType = "Login";

      // send the mesasge to the background
      chrome.runtime.sendMessage(
        { action: "GetInput", url: mURL, type: mType,
          data: mTexts, time: mLocalTime
        },
        function(response) {
        }
      );
    });
  }
}

/**
 * Add form tag to the input tags when there is no corresponding form tag
 * Currently, it might be NOT able to find corresponding form tag.
 * This approach might cause ANY PROBLEMS since it modifies DOM structure.
 * Author: InHwan Kim
 */
function handleNoFormInputs() {
  var mInputs = $('input[type=password]');
  var idIndex = 0;

  for (var idx = 0; idx < mInputs.length; idx++) {
    var tmpInput = mInputs[idx];
    var iparent = $(tmpInput).parent()[0];

    if (iparent.nodeName.toLowerCase() === 'form') {
      // do nothing if it has form tag as parent.
    }
    else if ($(tmpInput).closest('form').length == 0) {
      /**
       * if parent is not form tag, we need to create one.
       * First we need to store all the childs temporarily
       * and then attach them to the newly created form tag.
       */
      var form = document.createElement('form');
      form.id = 'TMPIUGenedForm' + idIndex++;

      // move all the child nodes to the form tag.
      while (iparent.childNodes.length > 0) {
        form.appendChild(iparent.childNodes[0]);
      }

      // append form tag to the original parent node.
      iparent.appendChild(form);
    }
  }
}
