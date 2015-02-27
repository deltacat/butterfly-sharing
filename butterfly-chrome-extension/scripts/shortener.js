function shortenUrl(engine, url, func)
{
	switch(engine)
	{
		case "is.gd":
			return shortenUrlByIsgd(url, func);
			break;
		case "aa.cx":
			return shortenUrlByAacx(url, func);
			break;
		case "goo.gl":
			return shortenUrlByGoogl(url, func);
			break;
		case "dwz.cn":
			return shortenUrlByBaidu(url, func);
			break;
		case "t.cn":
		case undefined:
			return shortenUrlBySina(url, func);
			break;
	}
}

function shortenUrlByBaidu(url, func){
	var apiAddress = "http://dwz.cn/create.php";
	
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", apiAddress, true);
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
		else {	
			response = {status: "error", message: xmlhttp.statusText};
		}
		
		func(response);
	}
	var source = "url="+encodeURIComponent(url);
	xmlhttp.send(source);
}

function shortenUrlBySina(url, func){
	var apiKey = APPKEY_SINA;
	var apiAddress = "http://api.t.sina.com.cn/short_url/shorten.json";
	
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", apiAddress + "?source=" + apiKey + "&url_long=" + encodeURIComponent(url), true);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status){
			var data = JSON.parse(xmlhttp.responseText);
			response = {status: "success", message: data[0].url_short};
		}
		else {
			response = {status: "error", message: xmlhttp.statusText};
		}	
		
		func(response);
	}
	xmlhttp.send(null);
}

function shortenUrlByGoogl(url, func)
{
	var response;
	
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("POST", "https://www.googleapis.com/urlshortener/v1/url", true);
	xmlhttp.onload = function()
	{
		var data = JSON.parse(xmlhttp.responseText);
		if(200 == xmlhttp.status)
			response = {status: "success", message: data.id};
		else	
			response = {status: "error", message: data.error.message};
		
		func(response);
	}
	xmlhttp.setRequestHeader("Content-Type","application/json"); 
	xmlhttp.send('{"longUrl": "' + url + '"}');
}

function shortenUrlByIsgd(url, func)
{
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://is.gd/api.php?longurl=" + encodeURIComponent(url), true);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status)	
			response = {status: "success", message: xmlhttp.responseText};
		else	
			response = {status: "error", message: "Internal server error!"};

		func(response);
	}
	xmlhttp.send(null);
 
	return response;	
}

function shortenUrlByAacx(url, func)
{
	var response;
	var	xmlhttp = new XMLHttpRequest();
	xmlhttp.open("GET", "http://aa.cx/api.php?url=" + encodeURIComponent(url), true);
	xmlhttp.onload = function()
	{
		if(200 == xmlhttp.status)	
			response = {status: "success", message: xmlhttp.responseText};
		else	
			response = {status: "error", message: "Internal server error!"};

		func(response);
	}
	xmlhttp.send(null);
}