function checkLocalStorage()
{
	if (window.localStorage == null) 
	{
		alert("LocalStorage must be enabled for changing options.");
		return false;
	}
	return true;
}

function safeParseStorageItem(name)
{
	var item = localStorage.getItem(name);
	if(null == item)
		return undefined;
	else
		return JSON.parse(item);
}

// Begin: class Preferences define 
function Preferences()
{
	this.load();
}

Preferences.prototype.load = function()
{
	if(!checkLocalStorage())
		return;
		
	// define properties of class "Preferences"
	this.parameters = safeParseStorageItem("preferences");
	this.services = safeParseStorageItem("services");
	this.servicesW = safeParseStorageItem("servicesW");
	this.serviceNames = safeParseStorageItem("serviceNames");
	this.twitter = safeParseStorageItem("twitter");
	
	if((this.parameters == undefined)
		|| (this.services == undefined)
		|| (this.servicesW == undefined)
		|| (this.serviceNames == undefined)
		|| (this.twitter == undefined))
	{
		this.loadDefault();
	}
}

Preferences.prototype.loadDefault = function()
{
	var pref = this;
	var xhr = new XMLHttpRequest();
	xhr.open("GET", chrome.extension.getURL('/data/preferences.json'), false);
	xhr.onload = function()
	{
		var defaultPreferences = JSON.parse(xhr.responseText);
		
		pref.parameters = defaultPreferences.parameters;
		pref.services = defaultPreferences.services;
		pref.servicesW = defaultPreferences.servicesW;
		pref.serviceNames = defaultPreferences.serviceNames;
		pref.twitter = defaultPreferences.twitter;
	}
	xhr.send();
}

Preferences.prototype.save = function()
{
	if(!checkLocalStorage())
		return;
		
	localStorage.clear();

	localStorage.setItem("preferences", JSON.stringify(this.parameters));
	localStorage.setItem("services", JSON.stringify(this.services));
	localStorage.setItem("servicesW", JSON.stringify(this.servicesW));
	localStorage.setItem("serviceNames", JSON.stringify(this.serviceNames));
	localStorage.setItem("twitter", JSON.stringify(this.twitter));
}

Preferences.prototype.reload = function()
{
	this.load();
}
// End: class preferences define
