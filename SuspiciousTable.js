/*
 * Function name: getValue
 * Description:
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the table afterall.
 * Author: InHwan Kim
 */
function getValue(callback) {
	chrome.storage.sync.get(null, callback);
}

/*
 * Function name: getFilteredData
 * Description:
 * allObj contains all data objects from google sync server.
 * type should specify either "time" or "url".
 * This function will return data object set that is filtered
 * by 'type'.
 * Return: the list of key names
 * Author: InHwan Kim
 */
function getFilteredData(allObj, type) {
	var filtered = new Array();

	for (var itemKey in allObj) {
		// parsedStr[0] -> time#month
		// parsedStr[1] -> day
		// parsedStr[2] -> year + ' ' + data

		var posItem = allObj[itemKey].length-2;
		//alert(allObj[itemKey][posItem].hostName);
		var tokenedData = itemKey.split('#');
		if (tokenedData[0] == type) {
			//filtered.push(allObj[itemKey]);
			filtered.push(itemKey);
		}
	}

	return filtered;
}

/*
 * Function name: initTbl
 * Description:
 * Callback for chrome.storage.sync.get() function.
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the table.
 * Table will be displayed after the page is loaded.
 * Author: BoSung Kim
 */
function initTbl(obj) {

  var keyList = getFilteredData(obj, "url");

  //var d = new Date();
  //var day = (d.getMonth()+1)+"/"+d.getDate()+"/"+d.getFullYear();



  // set current date to HTML
  var mDate = new Date();
  mLocalTime = (mDate.getMonth()+1) + '/' + mDate.getDate() + '/' + mDate.getFullYear();
  var mTime = document.getElementById("local_time");
  mTime.innerHTML = "Today: " + mLocalTime;


  //var day = "9/25/2014";

  var timeList = getFilteredData(obj, "time");

  var table = document.getElementById("suspicious_list");

  for(var i = 0; i < keyList.length; i++) {

/*
 * Suspicious or warning site are displayed based on values set by the user.
 * default suspicious value is 10 and warning value is 20.
 * Author: Duhee Ye
 */
    var url = keyList[i].split('#');
    var objLen = obj[keyList[i]].length;
    var count = 0;

    for(var k =0; k<timeList.length ; k++){
        var timeToken = timeList[k].split('#');
        var storedDay = timeToken[1].split(" ");
        if(url[1] == obj[timeList[k]][obj[timeList[k]].length-2].value
          && mLocalTime == storedDay[0])
          count++;
    }

    var setting = getFilteredData(obj, "setting");
    var suspicious;
    var warning;

    if(setting.length == 0){
      suspicious = 10;
      warning = 20;
    } else{
        suspicious = obj[setting[0]][0].value;
        warning = obj[setting[0]][1].value;
    }

    if(count > suspicious){
		  var row = table.insertRow(1);
		  var cell_site = row.insertCell(0);
		  var cell_access_num = row.insertCell(1);
		  var cell_status = row.insertCell(2);

		  cell_site.innerHTML = url[1];
		  cell_access_num.innerHTML = count;

		  if(count > warning)
			  cell_status.innerHTML = "Warnig";
		  else if(count > suspicious)
			  cell_status.innerHTML = "Suspicious";
	  }
  }
}

/* Initiate table processing */
getValue(initTbl)
