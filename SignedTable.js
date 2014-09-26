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
  
  var table = document.getElementById("signed_ups_list");
  
  for(var i = 0; i < keyList.length; i++) {
    var row = table.insertRow(1);
    var cell_site = row.insertCell(0);
    var cell_information = row.insertCell(1);
    var cell_num_access = row.insertCell(2);
    var cell_lateset = row.insertCell(3);
    var cell_btn = row.insertCell(4);
  
    //obj[keyList[0]][0].name  
    var url = keyList[i].split('#');
    var objLen = obj[keyList[i]].length;
    
    cell_site.innerHTML = url[1];
    
    for(var j = 0; j < objLen - 2; j++) {
      if(j == objLen - 3)
        cell_information.innerHTML += obj[keyList[i]][j].value;
      else
        cell_information.innerHTML += obj[keyList[i]][j].value + ", ";
    }
    

    //cell_num_access = obj[keyList[i]][objLen-1].value;
    //cell_lateset = obj[keyList[i]][objLen].value;
    

    cell_num_access.innerHTML = obj[keyList[i]][objLen-1].value;
    cell_lateset.innerHTML = obj[keyList[i]][objLen-2].value;

    
    var btn = document.createElement('input');
    btn.type = 'button';
    btn.id = 'btn';
    btn.value = 'Delete';
    btn.onclick = deleteRow;
    
    cell_btn.style.textAlign = "center";
    cell_btn.appendChild(btn);
  }
}

/*
 * Function name: deleteRow
 * Description:
 * Each row has a button.
 * When the button of each row is clicked,
 * this function will delete the row from the table
 * and delete the data from the sync server by the key
 * Author: BoSung Kim
 */
function deleteRow() {
  var index = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById("signed_ups_list");
  var delKey = "url#" + table.rows[index].cells[0].innerHTML;
  
  chrome.storage.sync.remove(delKey, function(){
  });
  
  table.deleteRow(index);
  location.reload();
}

/* Initiate table processing */
getValue(initTbl);