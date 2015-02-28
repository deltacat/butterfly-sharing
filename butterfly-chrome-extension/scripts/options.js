var g_preferences = new Preferences();

//获取下拉列表选中项的文本
function getSelectedText(name)
{
	var combox = $(name)[0];
	for(var i=0;i<combox.length;i++)
	{
		if(combox[i].selected==true)
		{
			return combox[i].innerText;
		}
	}
}

// 设置下拉列表的选中项
function setSelectedText(name, text)
{
	var combox = $(name)[0];
	for(var i=0; i<combox.length; i++)
	{
		if(combox[i].innerText == text)
		{
			return combox[i].selected = true;
		}
	}
}

function createSnsOption(service, checked)
{
	var checkedTag = "";
	if(checked)
		checkedTag = " checked";
	var snsOption = '';
	snsOption += '<tr>';
	snsOption += '	<td width="23"><input type="checkbox" id="' + service + '"' + checkedTag + '/></td>';
	snsOption += '	<td width="23"><img src="icons/' + service + '.png" width="16"></td>'; 
	snsOption += '	<td>' + g_preferences.serviceNames[service]+ '</td>'; 
	snsOption += '</tr>';

	return snsOption;
}
 
function saveAll()
{
	if(g_preferences == undefined || g_preferences == null)
		return;
		
	g_preferences.parameters = 
		{
			auto_copy : $("#chkAutoCopy").is(":checked"),
			show_qrcode : $("#chkShowQrCode").is(":checked"),
			show_icon : $("#chkShowIcon").is(":checked"),
			include_title : $("#chkIncludeTitle").is(":checked"),
			shorten_service : getSelectedText('#shortenService')
		}
		
	for(var service in g_preferences.services)
	{
		g_preferences.services[service] = document.getElementById(service).checked;
	}
	
	g_preferences.twitter =
		{
			enabled : $("#chkTwitter").attr("checked"),
			API : $("#twtApi").attr("value"),
			username : $("#twtUser").attr("value"),
			password : $("#twtPass").attr("value"),
			OAuth : ""
		}

	g_preferences.save();	
}

function loadDefault()
{
	if(g_preferences == undefined || g_preferences == null)
		g_preferences = new Preferences();
		
	g_preferences.loadDefault();
	
	loadPage();
}

function loadMarkdown(content_url, placeid)
{
	var xhr = new XMLHttpRequest();
	xhr.open("GET", content_url, true);
	xhr.onload = function()
	{
		if(xhr.responseText != null)
		{
			var content = markdown.toHTML(xhr.responseText);
			if(!isNullOrUndefined(content))
			{
				var $place = $(placeid);
				$place.append(content);
			}
		}
	}
	xhr.send();	
}
 
function loadPage()
{
	var preferences = g_preferences.parameters;
	
	var manifest = chrome.runtime.getManifest();
	$("#version").text(manifest.version);

	// basic options
	$("#chkIncludeTitle").prop("checked", preferences.include_title);
	$("#chkShowQrCode").prop("checked", preferences.show_qrcode);
	$("#chkShowIcon").prop("checked", preferences.show_icon);
	$("#chkAutoCopy").prop("checked", preferences.auto_copy);
	setSelectedText("#shortenService", preferences.shorten_service);
	
	// Create services.
	var services = g_preferences.services;
	var servicesW = g_preferences.servicesW;
	var servicesContainer = document.getElementById("services");
	var servicesContainerW = document.getElementById("servicesW");
	servicesContainer.innerHTML = "";
	servicesContainerW.innerHTML = "";
	for (var service in services)
	{
		if(service in servicesW)
			servicesContainerW.innerHTML += createSnsOption(service, services[service]);
		else
			servicesContainer.innerHTML += createSnsOption(service, services[service]);
	}
	
	// Twitter options
	var twitter = g_preferences.twitter;
	$("#chkTwitter").attr("checked", twitter.enabled);
	$("#twtApi").attr("value", twitter.API);
	$("#twtUser").attr("value", twitter.username);
	$("#twtPass").attr("value", twitter.password);
	
	// load changelog, license, etc.
	loadMarkdown(URL_CHANGELOG, "#tabs-changelog");
	loadMarkdown(URL_LICENSE, "#tabs-license");

}

$(document).ready(function() {
	if(g_preferences == undefined || g_preferences == null)
		g_preferences = new Preferences();

	$("#mainTabs").tabs();
	$("#divOptionsBottom a").button();
	$("#divOptionsBottom #btnSave").button( "option", "icons", {primary:'ui-icon-disk'} );

	loadPage();		
	
	$("#btnSave").click(function() {
		saveAll();
	});
	
	$("#btnReload").click(function() {
		loadDefault();
	})
});

