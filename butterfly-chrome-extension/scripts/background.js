var g_preferences = new Preferences();

function copyToClipboard(content)
{
	var input = document.getElementById('content');
	if(null == input)
	{
		input = document.createElement('input');
		input.setAttribute("type", "text");
		input.setAttribute("id", "content");
		document.body.appendChild(input);
	}

	input.value = content;
	input.focus();
	input.select();
	
	document.execCommand('copy', false);
}
 
function tryShortenUrl(url, func)
{
	var preferences = g_preferences.parameters;
	if(preferences == undefined)
		var shortenService = undefined;
	else
		var shortenService = preferences.shorten_service;
	
	shortenUrl(shortenService, url, func);
}

chrome.extension.onMessage.addListener(function(request, sender, func) {			
	switch(request.type)
	{
		case REQUEST_SHORTEN:
			tryShortenUrl(request.url, func);
		break;
		
		case REQUEST_PREFERENCE_RELOAD:
			g_preferences.reload();
		break;
		
		case REQUEST_PREFERENCE_GET:
			
		break;
	}
});