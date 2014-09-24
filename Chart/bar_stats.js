/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the chart afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}

function countUsedInfoMonth(allObj, targetYear) {
	var count = 0;
	var index = 0;
	//var allkeys = Object.keys(allObj);

	// Sort data according to the month and year first.
	// Then we need to sort them again according to site name.
	for (var itemKey in allObj) {
		// parsedStr[0] -> time#month
		// parsedStr[1] -> day
		// parsedStr[2] -> year + ' ' + data

		//alert(allObj[itemKey][1].hostName);
		var tokenedData = itemKey.split('#');
		if (tokenedData == "time") {
			parsedStr = tokenedData.split('/');	
			month = parsedStr[0];
			year = parsedStr[2].split(' ')[0];

			// filtering data according to year.
			if (year == targetYear) {
				var sortedData = allObj[itemKey];
			}
		}
	}

	// count data using site name now.

	return count;
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
	result = countUsedInfoMonth(obj, 2014);

	var foo = new Object();
	foo.fillColor = "rgba(220,220,220,0.5)";
	foo.strokeColor = "rgba(220,220,220,0.8)";
	foo.highlightFill = "rgba(220,220,220,0.75)";
	foo.highlightStroke = "rgba(220,220,220,1)";
	foo.data = new Array(12);
	for (var i = 0; i < 12; i++) {
		foo.data[i] = 12;
	}

	var testDataSet1 = 
		{
			fillColor : "rgba(220,220,220,0.5)",
			strokeColor : "rgba(220,220,220,0.8)",
			highlightFill: "rgba(220,220,220,0.75)",
			highlightStroke: "rgba(220,220,220,1)",
			data : [65, 59, 80, 81, 56, 55, 40]
		};

	var barChartData = {
		labels : ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"],
		datasets : [
			foo,
			testDataSet1, 
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [65, 59, 80, 81, 56, 55, 40]
			},
			{
				fillColor : "rgba(151,187,205,0.5)",
				strokeColor : "rgba(151,187,205,0.8)",
				highlightFill : "rgba(151,187,205,0.75)",
				highlightStroke : "rgba(151,187,205,1)",
				data : [28, 48, 40, 19, 86, 27, 90]
			}
		]
	};

	window.onload = showBarChart(barChartData);
}

/*
 * This function process chart.
 */
function showBarChart(barData) {
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barData, {
			responsive : true
		});
}

/* Initiate chart processing */
getValue(processChart);
