var randomScalingFactor = function(){ return Math.round(Math.random()*100)};

var tmp;

function getValue(callback) {
  chrome.storage.sync.get(null, function(obj) {
    var allkeys = Object.keys(obj);
    tmp = allkeys[0];
  });
}

console.log(getValue());


var barChartData = {
	labels : [tmp,"February","March","April","May","June","July"],
	datasets : [
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
}

window.onload = function(){
	var ctx = document.getElementById("canvas").getContext("2d");
	window.myBar = new Chart(ctx).Bar(barChartData, {
		responsive : true
	});
}
