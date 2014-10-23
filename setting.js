/*
 * If click the 'clear', all of data are removed.
 * User set the threshold value and click the 'done',
 * then set the threshold that based on showing the suspicious site.
 * Author: Duhee Ye
 */
function getValue(callback) {
	chrome.storage.sync.get(null, callback);
}

function getFilteredData(allObj, type) {
	var filtered = new Array();

	for (var itemKey in allObj) {
		var posItem = allObj[itemKey].length-2;
		var tokenedData = itemKey.split('#');
		if (tokenedData[0] == type) {
			filtered.push(itemKey);
		}
	}

	return filtered;
}
/*
 * Function name: init
 * Description:
 * Callback for chrome.storage.sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to setting.html's textbox.
 * Each textbox displays setting value initially.
 * Author: Duhee Ye
 */

var suspicious;
var warning;

function init(obj){
  var setting = getFilteredData(obj, "setting");
  if(setting.length == 0){
    suspicious = 10;
    warning = 20;
    document.getElementById("suspicious").value = suspicious;
    document.getElementById("warning").value = warning;
  }else
  {
    suspicious = obj[setting[0]][0].value;
    warning = obj[setting[0]][1].value;
    document.getElementById("suspicious").value = suspicious;
    document.getElementById("warning").value = warning;
  }
}

var btn = document.getElementById('clear');

btn.onclick = function() {
  chrome.storage.sync.clear();
  alert("All data is deleted.");
  location.reload();

};


var btn2 = document.getElementById('threshold');

btn2.onclick = function() {
  //alert("btn2");
  suspicious = document.getElementById('suspicious').value;
  warning = document.getElementById('warning').value;
  var arr = {}
  var key = "setting#threshold";
  var data = [{name: 'suspicious', value: suspicious },{name: 'warning', value: warning }];
  arr[key] = data;
  chrome.storage.sync.set(arr, function(){
     alert("Threshold values are set.");
  });
}

getValue(init)