function copyToClipboard(content)
{
	var input = document.getElementById('tobeCopy');
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
 
chrome.extension.onMessage.addListener(function(request, sender, func) {			
	switch(request.type)
	{
		case REQUEST_PREFERENCE_RELOAD:
		break;
		
		case REQUEST_PREFERENCE_GET:
		break;
	}
});