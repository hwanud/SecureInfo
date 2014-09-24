/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the table afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}

/*
 * Callback for chrome.storage.sync.get() function. 
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the table.
 * Table will be displayed after the page is loaded.
 */
function initTbl(obj) {
  var allkeys = Object.keys(obj);
  
  var table = document.getElementById("t01");
  
  // one row
  var row = table.insertRow(1);
  
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  var cell4 = row.insertCell(3);
  
  cell1.innerHTML = "NEW CELL1";
  cell2.innerHTML = "NEW CELL2";
  cell3.innerHTML = "NEW CELL3";
  
  var btn = document.createElement('input');
  btn.type = 'button';
  btn.id = 'btn';
  btn.value = 'Delete';
  btn.onclick = deleteRow;
  
  cell4.style.textAlign = "center";
  cell4.appendChild(btn);
}

/*
 * Each row has a button.
 * When the button of each row is clicked,
 * this function will delete the row from the table.
 */
function deleteRow() {
  var index = this.parentNode.parentNode.rowIndex;
  var table = document.getElementById("t01");
  table.deleteRow(index);
}

getValue(initTbl);