/*
 * Description: 
 * Author: Duhee Ye
 */
var btn = document.getElementById('clear');

btn.onclick = function() {
  chrome.storage.sync.clear();
    alert("cleared!");
    
};

var btn2 = document.getElementById('threshold');

btn2.onclick = function() {
  //alert("btn2");
  var suspicious = document.getElementById('suspicious').value;
  var warning = document.getElementById('warning').value;
  var arr = {}
  var key = "setting#threshold";
  var data = [{name: 'suspicious', value: suspicious },{name: 'warning', value: warning }];
  arr[key] = data;
  chrome.storage.sync.set(arr, function(){
    alert("threshold value stored");
  });
}