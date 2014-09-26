/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the table afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}

/*
 * NOT USED - 2014.09.24.
 * allObj contains all data objects from google sync server.
 * type should specify either "time" or "url".
 * This function will return data object set that is filtered
 * by 'type'.
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
 * Callback for chrome.storage.sync.get() function. 
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the table.
 * Table will be displayed after the page is loaded.
 */
function initTbl(obj) {
  var keyList = getFilteredData(obj, "time");
  
  var table = document.getElementById("access_history_list");
  
  for(var i = 0; i < keyList.length; i++) {
    var row = table.insertRow(1);
    var cell_time = row.insertCell(0);
    var cell_site = row.insertCell(1);
    var cell_information = row.insertCell(2);
    var cell_btn = row.insertCell(3);
  
    //obj[keyList[0]][0].name  
    var time = keyList[i].split('#');
    var objLen = obj[keyList[i]].length;
    
    cell_time.innerHTML = time[1];
    cell_site.innerHTML = obj[keyList[i]][objLen-2].value;
    for(var j = 0; j < objLen - 2; j++) {
      cell_information.innerHTML += obj[keyList[i]][j].value + ", ";
      if(j == objLen - 3)
        cell_information.innerHTML += obj[keyList[i]][j].value;
    }
    
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = 'btn';
    btn.value = 'Delete';
    btn.onclick = function(){
      var index = this.parentNode.parentNode.rowIndex;
      var table = document.getElementById("access_history_list");
      var delKey = "time#" + table.rows[index].cells[0].innerHTML;
      var urlKey = "url#"+obj[delKey][obj[delKey].length-2].value;  
      obj[urlKey][obj[urlKey].length -1].value--;
      var arr = {};
      arr[urlKey] = obj[urlKey];
      
      chrome.storage.sync.set(arr, function(){
        alert("set");
        });
      chrome.storage.sync.remove(delKey, function(){
      
        alert("remove");
      });
  
      table.deleteRow(index);
      
    };
    
    cell_btn.style.textAlign = "center";
    cell_btn.appendChild(btn);
  }
}

/*
 * Each row has a button.
 * When the button of each row is clicked,
 * this function will delete the row from the table.
 */


getValue(initTbl);