var btn = document.getElementById('clear');

btn.onclick = function() {
  chrome.storage.sync.clear();
    alert("fuck you");
    
};