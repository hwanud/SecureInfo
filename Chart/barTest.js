/*
 * This function will get all the data from sync server.
 * Provided with the callback function as a parameter,
 * it will process the chart afterall.
 */
function getValue(callback) { 
	chrome.storage.sync.get(null, callback);
}

/*
 * Callback for chrome.storage.sync.get() function. 
 * This will be passed to the sync.get() function.
 * This callback will get all the data from sync server,
 * and then put it to the chart.
 * Chart will be displayed after the page is loaded.
 */
function processChart(obj) {
	var allkeys = Object.keys(obj);
	var testKey = allkeys[0].toString();

	var barChartData = {
	  
		labels : [testKey,"February","March","April","May","June","July"],
		datasets : [
			{
				fillColor : "rgba(220,220,220,0.5)",
				strokeColor : "rgba(220,220,220,0.8)",
				highlightFill: "rgba(220,220,220,0.75)",
				highlightStroke: "rgba(220,220,220,1)",
				data : [65, 59, 80, 81, 56, 55, 40]
			},i
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
