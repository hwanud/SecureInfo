function listClick(e) {
	//alert(e.target.id);
	/*if (e.target.id == "sign-ups") {
	}
	else if (e.target.id == "history") {
	}*/
	chrome.tabs.create({url: chrome.extension.getURL(e.target.id+".html")});
}

document.addEventListener('DOMContentLoaded', function() {
	var divs = document.querySelectorAll('div');
	for (var i = 0; i < divs.length; i++) {
		divs[i].addEventListener('click', listClick);
	}
});