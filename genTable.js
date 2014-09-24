/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the table afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}

function getHistory(obj) {
  var allkeys = Object.keys(obj);
	var count = 0;
	var timelist = [];
	//var allkeys = Object.keys(allObj);

	// Sort data according to the month and year first.
	// Then we need to sort them again according to site name.
	for (var itemKey in obj) {
		// parsedStr[0] -> time#month
		// parsedStr[1] -> day
		// parsedStr[2] -> year + ' ' + data

		//alert(allObj[itemKey][1].hostName);
		var tokenedData = itemKey.split("#");
		if (tokenedData[0] == "time") {
			/*
			parsedStr = tokenedData.split('/');	
			month = parsedStr[0];
			year = parsedStr[2].split(' ')[0];

			// filtering data according to year.
			if (year == targetYear) {
				var sortedData = allObj[itemKey];
			}
			*/
			timelist.push(obj);
		}
	}
  
  return timelist;
	// count data using site name now.
}


/*
 * Callback for chrome.storage.sync.get() function. 
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the table.
 * Table will be displayed after the page is loaded.
 */
function initTbl(obj) {
  var res = getHistory(obj);
  alert(res[0][0].name);
  
  var table = document.getElementById("access_history_list");
  
  // one row
  var row = table.insertRow(1);
  
  var cell_time = row.insertCell(0);
  var cell_site = row.insertCell(1);
  var cell_information = row.insertCell(2);
  var cell_btn = row.insertCell(3);
  
  cell_time.innerHTML = "NEW CELL1";
  cell_site.innerHTML = "NEW CELL2";
  cell_information.innerHTML = "NEW CELL3";
  
  var btn = document.createElement('input');
  btn.type = 'button';
  btn.id = 'btn';
  btn.value = 'Delete';
  btn.onclick = deleteRow;
  
  cell_btn.style.textAlign = "center";
  cell_btn.appendChild(btn);
}

/*
 * Each row has a button.
 * When the button of each row is clicked,
 * this function will delete the row from the table.
 */
function deleteRow() {
  var index = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById("access_history_list");
  table.deleteRow(index);
}

getValue(initTbl);