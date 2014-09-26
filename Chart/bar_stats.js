/*
 * Overload the Array prototype here.
 * last keyword will return the last element in 
 * the array.
 */
Array.prototype.last = function() {
	    return this[this.length-1];
}

/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the chart afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}


/*
 * NOT USED - 2014.09.24.
 * This function counts the number of monthly access activity.
 * This is a starting function for counting.
 * Not completed yet and still requires development.
 * DO NOT USED this for now. 
 */
function countUsedInfoMonth(allObj, targetYear) {
	var count = 0;
	var index = 0;
	var filteredData;
	//var allkeys = Object.keys(allObj);

	// filteredData will have object sets that is marked
	// by "time#".
	filteredData = getFilteredData(allObj, "url");
	alert(filteredData.length);

	
	// Count data using site name now if chart shows 
	// monthly or daily statistics. 
	// We need to use "time#" type data to represent it
	// monthly, daily, etc.
	// getMonthlyCounts(allObj, filteredData);

	return count;
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
 * NOT USED - 2014.09.24.
 * This functin counts the number of monthly access to 
 * a certain website.
 * This is not completed yet. It is still developing 
 * and NOT USED for now.
 */
function getMonthlyCounts(objs, timeData) {
	var visit = new Array();

	for (var cnt = 0; cnt < timeData.length; cnt++) {
		var parsedStr = timeData[cnt].split('/');	
		var month = parsedStr[0];
		var year = parsedStr[2].split(' ')[0];

		var len = objs[timeData[cnt]].length;
		var tmpObj = new Object();
		tmpObj.url = objs[timeData[cnt]][len-2].value;
		tmpObj.visitCount = 0;
		var siteName = objs[timeData[cnt]][len-2].value;
		len = 0;
	}
	
	//var len = allObj[filteredData[0]].length;
	//alert(allObj[filteredData[0]][len-2].value);

	// filtering data according to year.
	/*if (year == targetYear) {
		filtered.push(itemKey);
	}*/
}

/*
 * Callback for chrome.storage.sync.get() function. 
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the chart.
 * Chart will be displayed after the page is loaded.
 */
function processChart(obj) {
	//var allkeys = Object.keys(obj);
	//var testKey = allkeys[0];

	// count the number of information that have been used
	// per website.
	// result will be an array that stores all the access
	// numbers.
	// var result = countUsedInfoMonth(obj, 2014);

	var urlData = getFilteredData(obj, "url");

	// Construct data for bar chart from here.
	var barDataSet = new Object();
	barDataSet.labels = new Array();
	barDataSet.datasets = new Array();

	// use random function to select bar color.
	var randColor = Math.floor(Math.random() * 256);

	// tmpData will contain data and schema for bar graph.
	var tmpData = new Object();
	tmpData.fillColor = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "0.5)";
	tmpData.strokeColor = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "0.8)";
	tmpData.highlightFill = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "0.75)";
	tmpData.highlightStroke = "rgba(" + randColor + "," + randColor + "," + randColor + "," + "1)";
	tmpData.data = new Array();

	// This loop constructs the object which contains labels 
	// and count value for web access.
	for (var i = 0; i < urlData.length; i++) {
		var retrievedUrl = urlData[i].split('#')[1];
		barDataSet.labels.push(retrievedUrl);
		
		var key = urlData[i];	// this has "url#" keyword with actual url.
		var len = obj[key].length;
		var totalVisitCount = obj[key][len-1].value;	// the last index has count value. 

		// push data continuously because we construct bar graph for each website.
		tmpData.data.push(totalVisitCount);	
	}

	// Final stage to construct bar graph data. 
	barDataSet.datasets.push(tmpData);

	// Show bar graph on page loading.
	window.onload = showBarChart(barDataSet);
}

/*
 * This function process chart and prepare to show 
 * afterward with window.onload.
 */
function showBarChart(barData) {
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barData, {
			responsive : true
		});
}

/* Initiate chart processing */
getValue(processChart);
