var g_preferences = new Preferences();

function copyToClipboard(text)
{
	var input = document.getElementById('url');
	input.value = text;					
	input.focus();
	input.select();
	document.execCommand('Copy');
}
 
function shortenUrl(url)
{
	var preferences = g_preferences.parameters;
	if(preferences == undefined)
		var shortenService = undefined;
	else
		var shortenService = preferences.shorten_service;
	
	switch(shortenService)
	{
		case "is.gd":
			return shortenUrlByIsgd(url);
			break;
		case "aa.cx":
			return shortenUrlByAacx(url);
			break;
		case "goo.gl":
		case undefined:
			return shortenUrlByGoogl(url);
			break;
	}
}

function shortenUrlByGoogl(url)
{
	var response;
	
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "http://goo.gl/api/url?user=toolbar@google.com&url=" + encodeURIComponent(url) + "&auth_token=" + getAuthToken(url), false);
	xmlhttp.onload = function()
	{
		var object = JSON.parse(xmlhttp.responseText);
		
		if(object["short_url"] == undefined)
			response = {status: "error", message: object["error_message"]};
		else	
			response = {status: "success", message: object["short_url"]};
	}
	xmlhttp.send(null);
 
	return response;
}

function shortenUrlByIsgd(url)
{
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://is.gd/api.php?longurl=" + encodeURIComponent(url), false);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status)	
			response = {status: "success", message: xmlhttp.responseText};
		else	
			response = {status: "error", message: "Internal server error!"};
	}
	xmlhttp.send(null);
 
	return response;	
}

function shortenUrlByAacx(url)
{
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://aa.cx/api.php?url=" + encodeURIComponent(url), false);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status)	
			response = {status: "success", message: xmlhttp.responseText};
		else	
			response = {status: "error", message: "Internal server error!"};
	}
	xmlhttp.send(null);
 
	return response;	
}
 
chrome.extension.onRequest.addListener(function(request, sender, func) 
{			
	switch(request.type)
	{
		case REQUEST_SHORTEN:
			var response = shortenUrl(request.url);
			func(response);
		break;
		
		case REQUEST_COPY:
			copyToClipboard(request.content);
		break;
		
		case REQUEST_PREFERENCE_RELOAD:
			g_preferences.reload();
		break;
		
		case REQUEST_PREFERENCE_GET:
			
		break;
	}
});