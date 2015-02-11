// Request type define

REQUEST_SHORTEN = "shorten";
REQUEST_COPY = "copy";
REQUEST_PREFERENCE_GET = "preference.get";
REQUEST_PREFERENCE_RELOAD = "preference.reload";
REQUEST_PREFERENCE_SAVE = "preference.save";
REQUEST_PREFERENCE_LOADDEFAULT = "preference.loadDefault";

function isNullOrUndefined(obj)
{
	return (null == obj) || (undefined == obj);
}