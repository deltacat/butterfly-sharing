var g_preferences = new Preferences();

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
			return shortenUrlByGoogl(url);
			break;
		case "dwz.cn":
			return shortenUrlByBaidu(url);
			break;
		case "t.cn":
		case undefined:
			return shortenUrlBySina(url);
			break;
	}
}

function shortenUrlByBaidu(url){
	var apiAddress = "http://dwz.cn/create.php";
	
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", apiAddress, false);
	xmlhttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded"); 
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status){
			var data = JSON.parse(xmlhttp.responseText);
			if(0 == data.status)
				response = {status: "success", message: data.tinyurl};
			else
				response = {status: "error", message: data.err_msg};
		}
		else	
			response = {status: "error", message: xmlhttp.statusText};
	}
	var source = "url="+encodeURIComponent(url);
	xmlhttp.send(source);
 
	return response;	
}

function shortenUrlBySina(url){
	var apiKey = APPKEY_SINA;
	var apiAddress = "http://api.t.sina.com.cn/short_url/shorten.json";
	
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", apiAddress + "?source=" + apiKey + "&url_long=" + encodeURIComponent(url), false);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status){
			var data = JSON.parse(xmlhttp.responseText);
			response = {status: "success", message: data[0].url_short};
		}
		else	
			response = {status: "error", message: xmlhttp.statusText};
	}
	xmlhttp.send(null);
 
	return response;	
}

function shortenUrlByGoogl(url)
{
	var response;
	
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "https://www.googleapis.com/urlshortener/v1/url", false);
	xmlhttp.onload = function()
	{
		var data = JSON.parse(xmlhttp.responseText);
		if(200 == xmlhttp.status)
			response = {status: "success", message: data.id};
		else	
			response = {status: "error", message: data.error.message};
	}
	xmlhttp.setRequestHeader("Content-Type","application/json"); 
	xmlhttp.send('{"longUrl": "' + url + '"}');
 
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
 
chrome.extension.onMessage.addListener(function(request, sender, func) 
{			
	switch(request.type)
	{
		case REQUEST_SHORTEN:
			var response = shortenUrl(request.url);
			func(response);
		break;
		
		case REQUEST_COPY:
			// disable clipboard functions.
			// copyToClipboard(request.content);
		break;
		
		case REQUEST_PREFERENCE_RELOAD:
			g_preferences.reload();
		break;
		
		case REQUEST_PREFERENCE_GET:
			
		break;
	}
});