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
 * NOT USED - 2014.09.24.
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
  // Get the name of the key from the sync server    
  var keyList = getFilteredData(obj, "time");
  
  // Ge the table from the html by id
  var table = document.getElementById("access_history_list");

  // Dinamically add the row into the table  
  for(var i = 0; i < keyList.length; i++) {
    // Make cells for the row
    var row = table.insertRow(1);
    var cell_time = row.insertCell(0);
    var cell_site = row.insertCell(1);
    var cell_information = row.insertCell(2);
    var cell_btn = row.insertCell(3);
  
    var time = keyList[i].split('#');
    var objLen = obj[keyList[i]].length;
    
    /* Set the value of each cell
       and set the button for the last cell */
    cell_time.innerHTML = time[1];
    cell_site.innerHTML = obj[keyList[i]][objLen-2].value;
    
    for(var j = 0; j < objLen - 2; j++) { 
      if(j == objLen - 3)
        cell_information.innerHTML += obj[keyList[i]][j].value;
      else
        cell_information.innerHTML += obj[keyList[i]][j].value + ", ";
    }
    
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = 'btn';
    btn.value = 'Delete';
    btn.onclick = function() {
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
        if(obj[urlKey][obj[urlKey].length -1].value <= 0)
          chrome.storage.sync.remove(urlKey, function(){
            alert("url removed!");
          });
        alert("time removed");
      });

      table.deleteRow(index);
      location.reload();
    };
    
    cell_btn.style.textAlign = "center";
    cell_btn.appendChild(btn);
  }
}

/* Initiate table processing */
getValue(initTbl);