var contexts = ["page"];
var MENUID_BUTTERFLY_COPY = "butterfly_copy";
var MENUID_BUTTERFLY_OPTION = "butterfly_option";
var MENUID_BUTTERFLY_SHARETO = "butterfly_shareto_";

function buildMenus(){
	chrome.contextMenus.create({
		"title" : "Shorten and copy", 
		"id" : MENUID_BUTTERFLY_COPY, 
		"contexts" : contexts},
		function() {
			if (chrome.extension.lastError) {
				console.log("Got expected error: " + chrome.extension.lastError.message);
			}
	});	

	// TODO: add more menu item
	/* 
	chrome.contextMenus.create({
		"title" : "Options ...", 
		"id" : MENUID_BUTTERFLY_OPTION, 
		"contexts" : contexts},
		function() {
			if (chrome.extension.lastError) {
				console.log("Got expected error: " + chrome.extension.lastError.message);
			}
	});*/	

}

function shortenAndCopy(url, title) {

	var preferences = new Preferences;
	var engine = preferences.parameters.shorten_service;
	
	var shorterner = new Shortener(engine);
	
	shorterner.shortenUrl(url, function(response) {
		
		if(response.status != "error")
		{
			var content = title + ": " + response.message;
			copyToClipboard(content);
		}		
	});
}


// TODO: control menu show/hide via option
//chrome.runtime.onInstalled.addListener(function() {
//var preferences = new Preferences;
//var show_menu = preferences.parameters.show_menu;
//if(show_menu) 
	buildMenus();
//});

chrome.contextMenus.onClicked.addListener(function(info, tab) {
	console.log(info);
	switch(info.menuItemId)
	{
		case MENUID_BUTTERFLY_COPY:
			shortenAndCopy(tab.url, tab.title);
		break;
		
		case MENUID_BUTTERFLY_OPTION:
		break;
	}
});
