// Request type define

REQUEST_SHORTEN = "shorten";
REQUEST_PREFERENCE_GET = "preference.get";
REQUEST_PREFERENCE_RELOAD = "preference.reload";
REQUEST_PREFERENCE_SAVE = "preference.save";
REQUEST_PREFERENCE_LOADDEFAULT = "preference.loadDefault";

APPKEY_SINA = "4284479491"; 

URL_README = "https://raw.githubusercontent.com/deltacat/butterfly-sharing/master/README.md";
URL_CHANGELOG = "https://raw.githubusercontent.com/deltacat/butterfly-sharing/master/changelog.md";
URL_LICENSE = "https://raw.githubusercontent.com/deltacat/butterfly-sharing/master/LICENSE.md";

function isNullOrUndefined(obj)
{
	return (null == obj) || (undefined == obj);
}

function getVersion(){
	var manifest = chrome.runtime.getManifest();
	if(null == manifest)
		return "0.0.0";
	else
		return manifest.version;
}